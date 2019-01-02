import LayoutNode from './LayoutNode';
import LayoutLink from './LayoutLink';
import SVGPanZoom from '../../lib/SVGPanZoom';
import ToolTip from '../ToolTip';
import Symbols from '../symbols';
import ToolBox from '../ToolBox';
import {
    createSvgElement,
    setSvgAttributes,
    setElemStyle
} from '../dom';

class Layout {
    constructor({matrix, initOptions}){
        this.matrix = matrix;
        this.initOptions = initOptions;
        
        Layout.layoutNodeMap = {};
        this.layoutMatrix = [];
        this.init();
    }
    init(){
        let { width, height, el, backgroundColor } = this.initOptions;

        this.svgCanvas = createSvgElement('svg');
        setSvgAttributes(this.svgCanvas, {
            width, height,
            id: 'viewport'
        });
        setElemStyle(this.svgCanvas, {
            backgroundColor
        });

        let symbols = this.createSymbols();
        symbols.forEach(symbol => {
            this.svgCanvas.appendChild(symbol);
        });

        this.linksWraper = createSvgElement('g');

        this.rootElement = document.querySelector(el);
    }
    build({rowConfig, columnConfig, node}){
        const { matrix, layoutMatrix } = this;
        const { gap: rowGap, height: rowHeight } = rowConfig;
        const { gap: columnGap } = columnConfig;

        let currentTop = 0; //current row top

        for(let i = 0; i < matrix.length; i++){
            let row = matrix[i];
            let layoutRow = [];
            let rowTop = currentTop;
            let currentLeft = 0;

            for(let j = 0; j < row.length; j++){
                let graphNode = row[j];
                let buildRes = this.buildNode(graphNode, {
                    i,
                    j,
                    rowTop,
                    currentLeft,
                    columnGap,
                    node
                });
                let layoutNode = buildRes.layoutNode;

                currentLeft = buildRes.currentLeft;
                Layout.layoutNodeMap[graphNode.id] = layoutNode;
                layoutRow.push(layoutNode);
            }
            /**if align-center update node left */
            this.setRowContentCenter(layoutRow, currentLeft - columnGap);

            currentTop += (rowHeight + rowGap);
            layoutMatrix.push(layoutRow);
        }
        this.layoutMatrix = layoutMatrix;
    }
    buildNode(graphNode, {i, j, rowTop, currentLeft, columnGap, node}){
        let rowIndex = i;
        let columnIndex = j;
        let top = rowTop;
        let left = currentLeft;

        let layoutNode = graphNode.setLayoutNode(new LayoutNode(graphNode, {
            rowIndex, columnIndex, top, left
        }, node));

        currentLeft += (layoutNode.getWidth() + columnGap);

        return {
            layoutNode,
            currentLeft
        };
    }
    setRowContentCenter(layoutRow, sumWidth){
        const { rootElement } = this;
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
    createSymbols(){
        return Symbols.map(value => value.create());
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
        this.setToolBox(this.setSVGPanZoom());
    }
    addEventListeners(){
        let svgDom = document.querySelector('#viewport');
        
        /** node tooltip */
        [...svgDom.querySelectorAll('.nodeWraper')].forEach(nodeWraper => {
            let tooltip = new ToolTip('node');
            let nodeRect = nodeWraper.querySelector('.nodeRect');

            nodeWraper.addEventListener('mouseenter', () => {
                let { name } = nodeWraper.dataset;
                let { left, top, width } = nodeRect.getBoundingClientRect();
                
                tooltip.show({ left, top, text: name, dx: width/2 });
            });

            nodeWraper.addEventListener('mouseleave', () => {
                tooltip.hide();
            });
        });

        /** link tooltip */
        [...svgDom.querySelectorAll('.nodeLink')].forEach(nodeLink => {
            let tooltip = new ToolTip('link');
            
            nodeLink.addEventListener('mouseenter', (e) => {
                tooltip.show({ 
                    left: e.clientX,
                    top: e.clientY,
                    text: `${nodeLink.dataset.source} --> ${nodeLink.dataset.target}`
                });
            });

            nodeLink.addEventListener('mouseleave', () => {
                tooltip.hide();
            });
        });
    }
    setSVGPanZoom(){
        const { svgPanZoomConfig } = this.initOptions;
        const panZoomTiger = SVGPanZoom('#viewport', svgPanZoomConfig);

        panZoomTiger.zoomOut();
        return panZoomTiger;
    }
    setToolBox(panZoomTiger){
        const { toolBox } = this.initOptions;
        if(!toolBox){
            return;
        }

        const Toolbox = new ToolBox({
            panZoomTiger, 
            toolBox, 
            container: this.rootElement});

        this.Toolbox = Toolbox;
        requestAnimationFrame(() => {
            Toolbox.create('#viewport');
        });
        
        return ToolBox;
    }
    destroy(){
        this.rootElement.removeChild(document.querySelector('#viewport'));
        this.Toolbox.destroy();
    }
}

Layout.layoutNodeMap = {};

export default Layout;