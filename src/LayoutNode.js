import {
    createSvgElement,
    setSvgAttribute,
    setSvgAttributes,
    setElemStyle
} from './dom';
import layoutLink from './LayoutLink';

class LayoutNode {
    constructor(graphNode, info){
        this.graphNode = graphNode;
        this.info = info;

        this.defaultConfig = {
            width: 200,
            height: 32,
            rx: 2,
            ry: 2,
            startPointSize: 14,
            endPointSize: 12
        };
    }
    getWidth(){
        return this.defaultConfig.width;
    }
    addLeft(add){
        this.info.left += add;
    }
    createElement(){
        let { graphNode } = this;
        let nodeWraper = this.createWraper();
        let nodeRect = this.createRect();
        let nodeText = this.createText();
        
        nodeWraper.appendChild(nodeRect);
        nodeWraper.appendChild(nodeText);
        
        this.nodeWraper = nodeWraper;
        this.nodeRect = nodeRect;
        this.nodeText = nodeText;
        
        if(graphNode.links.source.length){
            let nodeStartPoint = this.creatStartPoint();
            nodeWraper.appendChild(nodeStartPoint);
            this.nodeStartPoint = nodeStartPoint;
        }

        if(graphNode.links.target.length){
            let nodeEndPoint = this.creatEndPoint();
            nodeWraper.appendChild(nodeEndPoint);
            this.nodeEndPoint = nodeEndPoint;
        }

        return nodeWraper;
    }
    createWraper(){
        const { width, height, rx, ry } = this.defaultConfig
        const { id, name } = this.graphNode;

        let nodeWraper = createSvgElement('g');
        setSvgAttributes(nodeWraper, {
            id: `nodeWraper_${id}`,
            class: 'nodeWraper',
            'data-name': name,
            width, height, rx, ry
        });

        return nodeWraper;
    }
    createRect(){
        const { width, height, rx, ry } = this.defaultConfig
        const { top: y, left: x } = this.info;

        let nodeRect = createSvgElement('rect');
        setSvgAttributes(nodeRect, {
            width, height, x, y, rx, ry,
            class: 'nodeRect'
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
    createText(){
        const { top: y, left: x } = this.info;
        const { name } = this.graphNode;

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
    creatStartPoint(){
        let { width, startPointSize, height } = this.defaultConfig;
        let { left, top } = this.info;
        let g = createSvgElement('g');
        let path = createSvgElement('path');
        let circle = createSvgElement('circle');
        
        let startPoint = {
            lx: left + ((width - startPointSize) / 2),
            ly: top + height,
            rx: left + ((width + startPointSize) / 2),
            ry: top + height,
            r: startPointSize / 2
        };
        setSvgAttributes(path, {
            d: `M ${startPoint.lx} ${startPoint.ly} A ${startPoint.r} ${startPoint.r} 0 0 0 ${startPoint.rx} ${startPoint.ry}`
        });
        setElemStyle(path, {
            fill: '#B1B6C0',
            stroke: '#B1B6C0'
        });
        g.appendChild(path);

        setSvgAttributes(circle, {
            r: (startPointSize/2) + 1,
            cx: startPoint.lx + (startPointSize / 2),
            cy: startPoint.ly,
            fill: 'transparent'
        });
        setElemStyle(circle, {
            cursor: 'pointer'
        });
        g.appendChild(circle);

        return g;
    }
    creatEndPoint(){
        let { width, startPointSize, height, endPointSize } = this.defaultConfig;
        let { left, top } = this.info;
        let g = createSvgElement('g');
        let use = createSvgElement('use');

        let endPoint = {
            lx: left + ((width - endPointSize) / 2),
            ly: top - (16)
        };
        setSvgAttributes(use, {
            href: '#top_anchor',
            width: endPointSize,
            height: '21',
            x: endPoint.lx,
            y: endPoint.ly
        });

        setElemStyle(use, {
            fill: '#B1B6C0',
            cursor: 'pointer'
        });

        g.appendChild(use);

        return g;
    }
}

export default LayoutNode;