import {GraphLinkCreator} from './GraphLink';
import GraphNode from './GraphNode';
import Layout from '../Layout/Layout';
import { textEllipsis, mergeObject } from '../utils';

class GraphRenderer {
    constructor(initOptions = {}){
        this.initOptions = this.mergeInitOptions(initOptions);
    }
    mergeInitOptions(initOptions){
        let defaultOptions = {
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            svgPanZoomConfig: {},
            toolBox: true
        };
        let res = {
            svgPanZoomConfig: mergeObject(defaultOptions.svgPanZoomConfig, initOptions.svgPanZoomConfig, true)
        };
        
        return Object.assign(defaultOptions, initOptions, res);
    }
    mergeRenderOptions(renderOptions){
        let { nodes, links } = renderOptions;
        let defaultOptions = {
            linkConfig: {
                linkType: 'curve'
            },
            rowConfig: {
                gap: 100,
                height: 35
            },
            columnConfig: {
                gap: 20
            },
            node: {
                icon: {
                    id: 'spark_icon'
                },
                formatter(node){
                    return textEllipsis(node.name, 20);
                }
            }
        };

        return this.renderOptions = {
            linkConfig: mergeObject(defaultOptions.linkConfig, renderOptions.linkConfig, true),
            rowConfig: mergeObject(defaultOptions.rowConfig, renderOptions.rowConfig, true),
            columnConfig: mergeObject(defaultOptions.columnConfig, renderOptions.columnConfig, true),
            nodes, links,
            node: mergeObject(defaultOptions.node, renderOptions.node, true)
        };
    }
    render(renderOptions = {}){
        const { nodes, links } = this.mergeRenderOptions(renderOptions);

        if(!nodes.length || !links.length){
            return;
        }
        
        this.reset();
        this.build(this.renderOptions);
    }
    reset(){
        GraphNode.nodeMap = {};
        Layout.layoutNodeMap = {};
    }
    destroy(){
        this.Layout.destroy();
    }
    build(renderOptions){
        const { 
            nodes, links, linkConfig, rowConfig, columnConfig,
            node
        } = renderOptions;

        let GraphLinks = links.reduce((prev, cur) => {
            let { exist, link } = GraphLinkCreator.create(cur, {nodes, linkConfig});

            if(!exist){
                prev.push(link);
            }
            return prev;
        }, []);

        /**find roots */
        let rootNodes = this.findRootNodes(GraphLinks);
        /**layout */
        let layout = this.layout(rootNodes);

        layout.build({rowConfig, columnConfig, node});
        layout.render();
    }
    findRootNodes(GraphLinks){
        let nodeMap = {};
        let minInCount = +Infinity;
        let inCountNodeMap = {};

        GraphLinks.forEach(link => {
            let { sourceNode } = link;
            let inCount = sourceNode.getInCount();

            if(nodeMap[sourceNode.id]){
                return;
            }

            if(minInCount > inCount){
                minInCount = inCount;
            }

            if(!inCountNodeMap[inCount]){
                inCountNodeMap[inCount] = [];
            }

            inCountNodeMap[inCount].push(sourceNode);
            nodeMap[sourceNode.id] = sourceNode;
        });

        return inCountNodeMap[minInCount];
    }
    layout(rootNodes){
        /**create tree matrix */
        let matrix = [rootNodes];
        let layoutNodeMap = rootNodes.reduce((prev, node) => {
            prev[node.id] = node;
            return prev;
        }, {});
        let { row } = this.getRowFromParent({parentNodes: rootNodes, layoutNodeMap});

        while(row.length){
            matrix.push(row);
            let rowRes = this.getRowFromParent({parentNodes: row, layoutNodeMap});
            row = rowRes.row;
        }
        /**create layout with matrix */
        let layout = new Layout({matrix, initOptions: this.initOptions});

        this.Layout = layout;

        return layout;
    }
    getRowFromParent({ parentNodes, layoutNodeMap}){
        let map = {};
        let row = [];
        let targetMap = {}; //aviod same row node link
       
        for(let i = 0; i < parentNodes.length; i++){
            let parentNode = parentNodes[i];
            let targetNodes = parentNode.getTargetNodes();
            
            targetNodes.filter(node => typeof node !== 'undefined').forEach(node => {
                if(!map[node.id] && !layoutNodeMap[node.id] && parentNode.id !== node.id){
                    /**aviod same row node link */
                    targetMap[node.id] = [];
                    node.links.source.forEach(link => {
                        targetMap[node.id].push(link.targetNode.id);
                    });

                    map[node.id] = node;
                    layoutNodeMap[node.id] = node;
                    row.push(node);
                }
            });
        }
        
        return { row };
    }
}

export default GraphRenderer;