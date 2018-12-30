import {GraphLinkCreator} from './GraphLink';
import GraphNode from './GraphNode';
import Layout from './Layout';

class GraphRenderer {
    constructor(initOptions = {}){
        this.initOptions = this.mergeOptions(initOptions);
    }
    mergeOptions(initOptions){
        let defaultOptions = {
            width: '100%',
            height: '100%'
        };
        
        return Object.assign(defaultOptions, initOptions);
    }
    render(renderOptions = {}){
        const { nodes, links } = renderOptions;

        if(!nodes.length || !links.length){
            return;
        }
        
        this.reset();
        this.build(renderOptions);
    }
    reset(){
        GraphNode.nodeMap = {};
        Layout.layoutNodeMap = {};
    }
    build(renderOptions){
        const { nodes, links } = renderOptions;

        let GraphLinks = links.reduce((prev, cur) => {
            let { exist, link } = GraphLinkCreator.create(cur, {nodes});

            if(!exist){
                prev.push(link);
            }
            return prev;
        }, []);

        /**find roots */
        let nodeMap = {};
        let rootNodes = GraphLinks.filter(link => {
            let {sourceNode, targetNode} = link;
            let inCount = sourceNode.getInCount();
            if(inCount === 0 && !nodeMap[sourceNode.id]){
                nodeMap[sourceNode.id] = sourceNode;
                return true;
            }
        }).map(link => link.sourceNode);

        /**layout */
        let layout = this.layout(rootNodes);

        layout.render();
    }
    layout(rootNodes){
        /**create tree matrix */
        let matrix = [rootNodes];
        let layoutNodeMap = {};
        let { row, pushToNextRow } = this.getRowFromParent({parentNodes: rootNodes, layoutNodeMap});

        while(row.length){
            matrix.push(row);
            let rowRes = this.getRowFromParent({parentNodes: row, layoutNodeMap, readyForPush: pushToNextRow});
            row = rowRes.row;
            pushToNextRow = rowRes.pushToNextRow;
        }

        /**create layout with matrix */
        let layout = new Layout({matrix, initOptions: this.initOptions});
        let layoutMatrix = layout.build();

        return layout;
    }
    getRowFromParent({ parentNodes, layoutNodeMap, readyForPush}){
        let map = {};
        let row = [];
        let targetMap = {}; //aviod same row node link
       
        for(let i = 0; i < parentNodes.length; i++){
            let parentNode = parentNodes[i];
            let targetNodes = parentNode.getTargetNodes();
            
            if(i === parentNodes.length -1){
                targetNodes = targetNodes.concat(readyForPush || []);
            }
            targetNodes.forEach(node => {
                if(!map[node.id] && !layoutNodeMap[node.id]){
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
        
        let pushToNextRow = [];
        for(let i = row.length - 1; i >= 0; i--){
            let node = row[i];
            let sourceId = node.id;
            let targetIds = targetMap[node.id];
            let readyForRemove = [];

            row.every((node, index) => {
                let has = targetIds.includes(node.id);
                if(has){
                    pushToNextRow.push(node)
                    readyForRemove.push(index);
                }
                return has;
            });

            readyForRemove.forEach(index => {
                delete layoutNodeMap[row[index].id]
                row.splice(index, 1);
            });
        }
        
        return { row, pushToNextRow };
    }
};

export default GraphRenderer;