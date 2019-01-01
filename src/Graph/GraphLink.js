import { GraphNodeCreator } from './GraphNode';

const linkMap = {};

class GraphLink {
    constructor(linkOption, options){
        let { source, target } = linkOption;
        let id = `${source}#!#@#${target}`;
        let {nodes} = options;

        this.linkOption = this.mergeLinkOptions(linkOption, options);
        this.id = id;
        
        this.sourceNode = this.buildNode('source', linkOption.source, nodes);
        this.targetNode = this.buildNode('target', linkOption.target, nodes);
    }
    buildNode(type, nodeId, nodes){
        let nodeRes = GraphNodeCreator.create(nodes.find(node => node.id === nodeId));
    
        nodeRes.node.addLink(type, this);
        
        return nodeRes.node;
    }
    mergeLinkOptions(linkOption, options){
        let {linkConfig} = options;
        let defaultLinkConfig = {
            linkType: 'curve'
        };

        return Object.assign(defaultLinkConfig, linkConfig || {}, linkOption);
    }
}

export const GraphLinkCreator = {
    create(linkOption, options){
        let { source, target } = linkOption;
        let id = `${source}#!#@#${target}`;
        let exist = !!linkMap[id];
        let link = linkMap[id] || new GraphLink(linkOption, options);

        if(exist){
            linkMap[id] = link;
        }

        return {exist, link};
    }
};