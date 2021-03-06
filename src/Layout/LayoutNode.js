import {
    createSvgElement,
    setSvgAttributes,
    setElemStyle
} from '../dom';
import { IconMap } from '../symbols';
import { mergeObject } from '../utils';

class LayoutNode {
    constructor(graphNode, info, globalNodeConfig){
        this.graphNode = graphNode;
        this.info = info;
        this.globalNodeConfig = globalNodeConfig;
        this.nodeConfig = mergeObject(globalNodeConfig, graphNode.nodeOptions, true);

        LayoutNode.Nodes[graphNode.id] = this;
        
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
    getLeft(){
        return this.info.left;
    }
    addLeft(add){
        this.info.left += add;
    }
    createElement(){
        let { graphNode, nodeConfig } = this;
        let nodeWraper = this.createWraper();
        let nodeRect = this.createRect();
        let nodeText = this.createText();
        
        nodeWraper.appendChild(nodeRect);
        nodeWraper.appendChild(nodeText);
        
        if(IconMap[nodeConfig.icon && nodeConfig.icon.id]){
            let nodeIcon = this.createIcon(nodeConfig.icon);
            nodeWraper.appendChild(nodeIcon);
        }

        this.nodeWraper = nodeWraper;
        this.nodeRect = nodeRect;
        this.nodeText = nodeText;
        
        let sourceLinks = graphNode.links.source.filter(link => link.targetNode);
        let targetLinks = graphNode.links.target.filter(link => link.sourceNode);
        if(sourceLinks.length){
            let nodeStartPoint = this.creatStartPoint();
            nodeWraper.appendChild(nodeStartPoint);
            this.nodeStartPoint = nodeStartPoint;
        }

        if(targetLinks.length){
            let nodeEndPoint = this.creatEndPoint();
            nodeWraper.appendChild(nodeEndPoint);
            this.nodeEndPoint = nodeEndPoint;
        }

        return nodeWraper;
    }
    createIcon(icon){
        let { height } = this.defaultConfig;
        let { left, top } = this.info;
        let use = createSvgElement('use');

        setSvgAttributes(use, {
            href: `#${icon.id}`,
            x: left + 5,
            y: top + ((height - 20) / 2),
            width: 20,
            height: 20
        });

        setElemStyle(use, {
            fill: icon.color || IconMap[icon.id].color
        });

        return use;
    }
    createWraper(){
        const { width, height, rx, ry } = this.defaultConfig;
        const { id, nodeOptions } = this.graphNode;

        let nodeWraper = createSvgElement('g');
        let dataSets = {
            'data-id': nodeOptions.id,
            'data-name': nodeOptions.name
        };

        setSvgAttributes(nodeWraper, Object.assign({
            id: `nodeWraper_${id}`,
            class: 'nodeWraper',
            width, height, rx, ry
        }, dataSets));

        return nodeWraper;
    }
    createRect(){
        const { width, height, rx, ry } = this.defaultConfig;
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
        const { graphNode } = this;
        const { top: y, left: x } = this.info;
        const nodeConfig = mergeObject(this.globalNodeConfig, graphNode.nodeOptions, true);
        
        let nodeText = createSvgElement('text');
        let textX = x + 30,
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
        nodeText.innerHTML = nodeConfig.formatter(graphNode);

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
        let { width, endPointSize } = this.defaultConfig;
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

LayoutNode.Nodes = {};

export default LayoutNode;