import LayoutNode from './LayoutNode';
import LayoutLink from './LayoutLink';
import SVGPanZoom from '../lib/SVGPanZoom';
import ToolTip from './ToolTip';
import {
    createSvgElement,
    setSvgAttribute,
    setSvgAttributes,
    setElemStyle
} from './dom';

class Layout {
    constructor({matrix, initOptions}){
        this.matrix = matrix;
        this.initOptions = initOptions;
        this.defaultConfig = {
            rowGap: 70,
            rowHeight: 35,
            columnGap: 20
        };
        Layout.layoutNodeMap = {};
        this.layoutMatrix = [];
        this.init();
    }
    init(){
        let { width, height, el } = this.initOptions;

        this.svgCanvas = createSvgElement('svg');
        setSvgAttributes(this.svgCanvas, {
            width, height,
            id: 'viewport'
        });

        let topAnchor = this.createTopAnchorSymbol();

        this.linksWraper = createSvgElement('g');
        this.svgCanvas.appendChild(topAnchor);

        this.rootElement = document.querySelector(el);
    }
    build(){
        const { matrix, layoutMatrix } = this;
        const { rowGap, rowHeight, columnGap } = this.defaultConfig;

        let currentTop = 0; //current row top

        for(let i = 0; i < matrix.length; i++){
            let row = matrix[i];
            let layoutRow = [];
            let rowTop = currentTop;
            let currentLeft = 0;

            for(let j = 0; j < row.length; j++){
                let graphNode = row[j];
                let left = currentLeft;
                let layoutNode = this.buildNode(graphNode, {
                    rowIndex: i,
                    columnIndex: j,
                    top: rowTop,
                    left
                });
                Layout.layoutNodeMap[graphNode.id] = layoutNode;
                layoutRow.push(layoutNode);
                currentLeft += (layoutNode.getWidth() + columnGap);
            }
            /**if align-center update node left */
            this.setRowContentCenter(layoutRow, currentLeft - columnGap);

            currentTop += (rowHeight + rowGap);
            layoutMatrix.push(layoutRow);
        }
        this.layoutMatrix = layoutMatrix;
    }
    buildNode(graphNode, info){
        
        return new LayoutNode(graphNode, info);
    }
    setRowContentCenter(layoutRow, sumWidth){
        const { svgCanvas, rootElement } = this;
        const { width } = this.initOptions;
        let pattern = /%/;
        let svgCanvasWidth = +width;

        if(pattern.test(width)){
            svgCanvasWidth = rootElement.offsetWidth * (width.slice(0, -1)/100);
        }

        let rowStartColumnLeft = (svgCanvasWidth / 2) - (sumWidth / 2);

        layoutRow.forEach(node => {
            node.addLeft(rowStartColumnLeft);
        });
    }
    createTopAnchorSymbol(){
        let symbol = createSvgElement('symbol');
        let title = createSvgElement('title');
        let g = createSvgElement('g');
        let path = createSvgElement('path');

        setSvgAttributes(symbol, {
            width: '12px',
            height: '12px',
            viewBox: '0 0 12 12',
            id: 'top_anchor'
        });

        title.innerHTML = 'arrow'

        setSvgAttributes(g, {
            id: 'arrow'
        });

        setSvgAttributes(path, {
            d: `M0,12 L0,4.5 C0,2.015 2.015,0 4.5,0 L7.5,0 C9.985,0 12,2.015 12,4.5 L12,12 L0,12 L0,12 Z M8.828,4.586 L6,7.414 L3.172,4.586 L1.757,6 L4.586,8.828 L4.586,8.828 L6,10.243 L7.414,8.828 L7.414,8.828 L10.243,6 L8.828,4.586 L8.828,4.586 Z`,
            id: 'Shape'
        });

        g.appendChild(title);
        g.appendChild(path);

        symbol.appendChild(g);

        return symbol;
    }
    renderNodes(){
        const { layoutMatrix, rootElement, linksWraper } = this;

        for(let i = 0; i < layoutMatrix.length; i++){
            let row = layoutMatrix[i];
            for(let j = 0; j < row.length; j++){
                let layoutNode = row[j];
                this.renderNodeLinks(layoutNode);
                this.svgCanvas.appendChild(layoutNode.createElement());
            }
        }

        this.svgCanvas.appendChild(linksWraper);
        rootElement.innerHTML = this.svgCanvas.outerHTML;
    }
    renderNodeLinks(layoutNode){
        let { linksWraper } = this;
        const { source } = layoutNode.graphNode.links;

        source.forEach(graphLink => {
            let layoutLink = new LayoutLink(graphLink);
            linksWraper.appendChild(layoutLink.createElement(Layout.layoutNodeMap));
        });
    }
    render(){
        this.renderNodes();
        this.addEventListeners();
        this.createToolBox();
        SVGPanZoom('#viewport');
    }
    addEventListeners(){
        let svgDom = document.querySelector('#viewport');
        
        /**hover tooltip */
        [...svgDom.querySelectorAll('.nodeWraper')].forEach(nodeWraper => {
            let tooltip = new ToolTip();
            let nodeRect = nodeWraper.querySelector('.nodeRect');

            nodeWraper.addEventListener('mouseenter', () => {
                let { name } = nodeWraper.dataset;
                let { left, top } = nodeRect.getBoundingClientRect();
                
                tooltip.show({ left, top, text: name });
            });

            nodeWraper.addEventListener('mouseleave', () => {
                tooltip.hide();
            });
        });
    }
    createToolBox(){

    }
}

Layout.layoutNodeMap = {};

export default Layout;