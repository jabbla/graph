import { createSvgElement, setSvgAttributes, setElemStyle } from "./dom";

class LayoutLink {
    constructor(graphLink){
        this.graphLink = graphLink;
    }
    createElement(layoutNodeMap){
        const { graphLink } = this;
        const { sourceNode, targetNode } = graphLink;
        const { linkOption } = graphLink;

        const layoutSourceNode = layoutNodeMap[sourceNode.id];
        const layoutTargetNode = layoutNodeMap[targetNode.id]; 

        let g = createSvgElement('g');
        let path = createSvgElement('path');
        let sourcePos = this.getNodePosition(layoutSourceNode).bottomMiddle;
        let targetPos = this.getNodePosition(layoutTargetNode).topMiddle;

        this.strokeByLineType(path, {sourcePos, targetPos});
        setSvgAttributes(path, {
            class: 'nodeLink',
            'data-source': graphLink.sourceNode.name,
            'data-target': graphLink.targetNode.name
        });

        setElemStyle(path, {
            stroke: '#B1B6C0',
            fill: 'none',
            strokeWidth: '2px',
            strokeLinecap: 'round',
            cursor: 'pointer'
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
    strokeByLineType(pathElem, {targetPos, sourcePos}){
        const { graphLink } = this;
        const { linkOption: { linkType } } = graphLink;
        
        if(linkType === 'curve'){
            setSvgAttributes(pathElem, {
                d: `M ${targetPos.x} ${targetPos.y} 
                Q ${targetPos.x} ${(sourcePos.y + targetPos.y)/2}, ${(sourcePos.x + targetPos.x)/2} ${(sourcePos.y + targetPos.y)/2} 
                T ${sourcePos.x} ${sourcePos.y}`,
                strokeLinejoin: 'round'
            });
        }
        
        if(linkType === 'line'){
            setSvgAttributes(pathElem, {
                d: `M ${targetPos.x} ${targetPos.y}, 
                L ${sourcePos.x} ${sourcePos.y}`
            });
        }
    }
    
};

export default LayoutLink;