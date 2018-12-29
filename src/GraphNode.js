import {
    createSvgElement,
    setSvgAttribute,
    setSvgAttributes,
    setElemStyle
} from './dom';

const nodeMap = {};

class GraphNode {
    constructor(nodeOption){
        if(nodeMap[nodeOption.id]){
            return nodeMap[nodeOption.id];
        }

        this.id = nodeOption.id;
        this.name = nodeOption.name;
        this.links = {
            source: [],
            target: []
        };
        nodeMap[this.id] = this;
    }
    build(){
        this.setSvgInfo();
        this.createElement();
    }
    setSvgInfo(){
        this.styleInfo = {
            width: 200,
            height: 32,
            x: 0,
            y: 0,
            rx: 2,
            ry: 2
        };
    }
    addLink(type, linkInst){
        let typedLinks = this.links[type];

        typedLinks.push(linkInst);
    }
    createElement(){
        let nodeWraper = this.createWraper();
        let nodeRect = this.createRect();
        let nodeText = this.createText();

        nodeWraper.appendChild(nodeRect);
        nodeWraper.appendChild(nodeText);

        this.nodeWraper = nodeWraper;
        this.nodeRect = nodeRect;
        this.nodeText = nodeText;
    }
    createRect(){
        const { width, height, x, y, rx, ry } = this.styleInfo

        let nodeRect = createSvgElement('rect');
        setSvgAttributes(nodeRect, {
            width, height, x, y, rx, ry
        });
        setElemStyle(nodeRect, {
            stroke: '#999',
            strokeWidth: '1',
            cursor: 'grab',
            fill: '#fff',
            boxSizing: 'border-box'
        });

        return nodeRect;
    }
    createWraper(){
        const { width, height, rx, ry } = this.styleInfo
        const { id } = this;

        let nodeWraper = createSvgElement('g');
        setSvgAttributes(nodeWraper, {
            id, width, height, rx, ry
        });

        return nodeWraper;
    }
    createText(){
        const { x, y } = this.styleInfo
        const { name } = this;

        let nodeText = createSvgElement('text');
        let textX = x + 54,
            textY = y + 17;

        setSvgAttributes(nodeText, {
            fontFamily: 'Helvetica, Arial, sans-serif, 微软雅黑',
            fill: '#ebebeb',
            x: textX,
            y: textY,
            dy: '.3em'
        });
        setElemStyle(nodeText, {
            fill: '#333'
        });
        nodeText.innerHTML = name;

        return nodeText;
    }
    getNodeElement(){
        return this.nodeWraper;
    }
    getInCount(){
        return this.links.target.length;
    }
    getOutCount(){
        return this.links.source.length;
    }
};

export default GraphNode;