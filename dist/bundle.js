'use strict';

function createSvgElement(tagname){
    let elem = document.createElementNS('http://www.w3.org/2000/svg', tagname);
    if(tagname === 'svg'){
        setAttributes(elem, {
            xmlns: 'http://www.w3.org/2000/svg',
            version: '1.1'
        });
    }
    return elem;
}

function setSvgAttribute(elem, attr, value){
    elem.setAttributeNS('http://www.w3.org/2000/svg', attr, value);
}

function setSvgAttributes(elem, option){
    for(let attr in option){
        let value = option[attr];

        setSvgAttribute(elem, attr, value);
    }
}
function setAttributes(elem, option){
    for(let attr in option){
        let value = option[attr];

        elem.setAttribute(attr, value);
    }
}
function setElemStyle(elem, options){
    Object.assign(elem.style, options);
}

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
        const { width, height, x, y, rx, ry } = this.styleInfo;

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
        const { width, height, rx, ry } = this.styleInfo;
        const { id } = this;

        let nodeWraper = createSvgElement('g');
        setSvgAttributes(nodeWraper, {
            id, width, height, rx, ry
        });

        return nodeWraper;
    }
    createText(){
        const { x, y } = this.styleInfo;
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
}

const linkMap = {};

class GraphLink {
    constructor(linkOption, options){
        let { source, target } = linkOption;
        let id = `${source}#!#@#${target}`;

        if(linkMap[id]){
            return linkMap[id];
        }

        this.linkOption = linkOption;
        this.id = id;
        linkMap[this.id] = this;

        this.sourceNode = this.buildNode('source', linkOption.source, options.nodes);
        this.targetNode = this.buildNode('target', linkOption.target, options.nodes);
    }
    buildNode(type, nodeId, nodes){
        let node = new GraphNode(nodes.find(node => node.id === nodeId));
        
        node.addLink(type, this);
        node.build();
        return node;
    }
}

class GraphRenderer {
    constructor(initOptions = {}){
        this.initOptions = this.mergeOptions(initOptions);
        console.log('initOptions', initOptions);
    }
    mergeOptions(initOptions){
        let defaultOptions = {
            width: '100%',
            height: '100%'
        };
        
        return Object.assign(defaultOptions, initOptions);
    }
    initSvgCanvas(){
        let { width, height } = this.initOptions;

        this.svgCanvas = createSvgElement('svg');
        setSvgAttributes(this.svgCanvas, {
            
            width, height
        });
    }
    render(renderOptions = {}){
        const { nodes, links } = renderOptions;

        if(!nodes.length || !links.length){
            return;
        }

        this.initSvgCanvas();
        this.build(renderOptions);
    }
    build(renderOptions){
        const { nodes, links } = renderOptions;
        let GraphLinks = links.map(link => new GraphLink(link, {nodes}));

        console.log('renderOptions', renderOptions);
        console.log(GraphLinks);

        /**find root */
        let rootNode = GraphLinks.find(link => {
            let {sourceNode, targetNode} = link;

            return sourceNode.getInCount() === 0;
        }).sourceNode;

        console.log(rootNode);

        GraphLinks.forEach(link => {
            this.svgCanvas.appendChild(link.sourceNode.getNodeElement());
            this.svgCanvas.appendChild(link.targetNode.getNodeElement());
        });

        document.querySelector(this.initOptions.el).innerHTML = this.svgCanvas.outerHTML;
    }
}

var Graph = {
    init(initOptions){
        return new GraphRenderer(initOptions);
    }
};

window.Graph = Graph;
