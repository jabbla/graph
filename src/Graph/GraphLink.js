import { GraphNodeCreator } from './GraphNode';

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
        let node = nodes.find(node => node.id === nodeId);
        
        if(!node){
            return;
        }

        let nodeRes = GraphNodeCreator.create(node);
    
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
GraphLink.linkMap = {};

export default GraphLink;

export const GraphLinkCreator = {
    create(linkOption, options){
        let { source, target } = linkOption;
        let id = `${source}#!#@#${target}`;
        let exist = !!GraphLink.linkMap[id];
        let link = GraphLink.linkMap[id] || new GraphLink(linkOption, options);

        if(exist){
            GraphLink.linkMap[id] = link;
        }

        return {exist, link};
    }
};