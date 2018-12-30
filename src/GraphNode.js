class GraphNode {
    constructor(nodeOption){
        this.id = nodeOption.id;
        this.name = nodeOption.name;
        this.links = {
            source: [],
            target: []
        };
    }
    addLink(type, linkInst){
        let typedLinks = this.links[type];

        if(!typedLinks.includes(linkInst)){
            typedLinks.push(linkInst);
        }
    }
    getInCount(){
        return this.links.target.length;
    }
    getOutCount(){
        return this.links.source.length;
    }
    getTargetNodes(){
        let { links } = this;

        return links.source.map(link => link.targetNode);
    }
};

GraphNode.nodeMap = {};
export default GraphNode;

export const GraphNodeCreator = {
    create(nodeOption){
        let { id } = nodeOption;
        let exist = !!GraphNode.nodeMap[id];
        let node = GraphNode.nodeMap[id] || new GraphNode(nodeOption);

        if(!exist){
            GraphNode.nodeMap[id] = node;
        }

        return {exist, node};
    }
};