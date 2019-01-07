import { createSvgElement, setSvgAttributes, setElemStyle } from "../dom";

class LayoutLink {
    constructor(graphLink){
        this.graphLink = graphLink;
    }
    createElement(layoutNodeMap){
        const { graphLink } = this;
        const { sourceNode, targetNode } = graphLink;

        if(!sourceNode || !targetNode){
            return;
        }

        this.layoutSourceNode = layoutNodeMap[sourceNode.id];
        this.layoutTargetNode = layoutNodeMap[targetNode.id]; 

        let g = createSvgElement('g');
        let path = createSvgElement('path');
        let sourcePos = this.getNodePosition(this.layoutSourceNode).bottomMiddle;
        let targetPos = this.getNodePosition(this.layoutTargetNode).topMiddle;

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

        graphLink.rendered = true;

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
                d: this.curveto(sourcePos, targetPos),
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
    curveto(sourcePos, targetPos){
        const { layoutSourceNode, layoutTargetNode } = this;
        const controllPoints = [
            targetPos.x, (sourcePos.y + targetPos.y)/2,
            sourcePos.x, (sourcePos.y + targetPos.y)/2
        ];
        let sibling = (Math.abs(layoutSourceNode.info.rowIndex - layoutTargetNode.info.rowIndex) <= 1);
        
        //when nodes with same x and isn't sibling row
        if(sourcePos.x === targetPos.x){
            let hasRenderedReverseLink = this.hasRenderedReverseLink();
            let factor = hasRenderedReverseLink? 50:150;

            if(!sibling || hasRenderedReverseLink){
                controllPoints[0] = targetPos.x + factor;
                controllPoints[1] = targetPos.y + (targetPos.y > sourcePos.y? -factor : factor);
                controllPoints[2] = sourcePos.x - factor;
                controllPoints[3] = sourcePos.y + (targetPos.y < sourcePos.y? -factor : factor);
            }
        }

        //when nodes in the same row
        if(layoutSourceNode.info.rowIndex === layoutTargetNode.info.rowIndex){
            let factor1 = 100;
            controllPoints[0] = targetPos.x;
            controllPoints[1] = targetPos.y - factor1;
            controllPoints[2] = sourcePos.x;
            controllPoints[3] = sourcePos.y + factor1;
        }

        //when node link to itself
        if(layoutSourceNode.info.rowIndex === layoutTargetNode.info.rowIndex && layoutSourceNode.info.columnIndex === layoutTargetNode.info.columnIndex){
            let factor2 = 150;
            controllPoints[0] = targetPos.x - factor2;
            controllPoints[1] = targetPos.y - factor2;
            controllPoints[2] = sourcePos.x - factor2;
            controllPoints[3] = sourcePos.y + factor2;
        }

        return `M ${targetPos.x} ${targetPos.y}
                C ${controllPoints.map(point => (point + ' '))} ${sourcePos.x} ${sourcePos.y}`;
    }
    hasRenderedReverseLink(){
        const { graphLink } = this;
        const { sourceNode, targetNode } = graphLink;

        return sourceNode.links.target.some(link => (link.rendered && link.targetNode.id === sourceNode.id && link.sourceNode.id === targetNode.id));
    }
}

export default LayoutLink;