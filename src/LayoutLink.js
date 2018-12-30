import { createSvgElement, setSvgAttributes, setElemStyle } from "./dom";

let linkMap = {};

class LayoutLink {
    constructor(graphLink){
        this.graphLink = graphLink;
    }
    createElement(layoutNodeMap){
        const { graphLink } = this;
        const { sourceNode, targetNode } = graphLink;

        const layoutSourceNode = layoutNodeMap[sourceNode.id];
        const layoutTargetNode = layoutNodeMap[targetNode.id]; 

        let g = createSvgElement('g');
        let path = createSvgElement('path');
        let sourcePos = this.getNodePosition(layoutSourceNode).bottomMiddle;
        let targetPos = this.getNodePosition(layoutTargetNode).topMiddle;

        setSvgAttributes(path, {
            d: `M ${targetPos.x} ${targetPos.y} 
            Q ${targetPos.x} ${(sourcePos.y + targetPos.y)/2}, ${(sourcePos.x + targetPos.x)/2} ${(sourcePos.y + targetPos.y)/2} 
            T ${sourcePos.x} ${sourcePos.y}`,
            strokeLinejoin: 'round'
        });
        setElemStyle(path, {
            stroke: '#B1B6C0',
            fill: 'none',
            strokeWidth: '2px',
            strokeLinecap: 'round'
        });

        g.appendChild(path);

        return g;
    }
    getNodePosition(node){
        let topMiddle = {
            x: node.info.left + (node.defaultConfig.width / 2),
            y: node.info.top - (node.defaultConfig.endPointSize)
        };

        let bottomMiddle = {
            x: topMiddle.x,
            y: node.info.top + node.defaultConfig.height + (node.defaultConfig.startPointSize / 2)
        };

        return {topMiddle, bottomMiddle};
    }
};

export default LayoutLink;