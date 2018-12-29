import GraphNode from './GraphNode';

const linkMap = {};

class GraphLink {
    constructor(linkOption, options){
        let { source, target } = linkOption;
        let id = `${source}#!#@#${target}`;

        if(linkMap[id]){
            return linkMap[id];
        }

        this.linkOption = linkOption;
        this.id = id;;

        linkMap[this.id] = this;

        this.sourceNode = this.buildNode('source', linkOption.source, options.nodes);
        this.targetNode = this.buildNode('target', linkOption.target, options.nodes);
    }
    buildNode(type, nodeId, nodes){
        const { id } = this;
        let node = new GraphNode(nodes.find(node => node.id === nodeId));
        
        node.addLink(type, this);
        node.build();
        return node;
    }
};

export default GraphLink;