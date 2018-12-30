import { GraphNodeCreator } from './GraphNode';

const linkMap = {};

class GraphLink {
    constructor(linkOption, options){
        let { source, target } = linkOption;
        let id = `${source}#!#@#${target}`;

        this.linkOption = linkOption;
        this.id = id;;

        this.sourceNode = this.buildNode('source', linkOption.source, options.nodes);
        this.targetNode = this.buildNode('target', linkOption.target, options.nodes);
    }
    buildNode(type, nodeId, nodes){
        const { id } = this;
        let nodeRes = GraphNodeCreator.create(nodes.find(node => node.id === nodeId));
    
        nodeRes.node.addLink(type, this);
        
        return nodeRes.node;
    }
};

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