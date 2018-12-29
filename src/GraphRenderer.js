import GraphLink from './GraphLink';
import { 
    createSvgElement,
    setSvgAttributes
} from './dom';

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
};

export default GraphRenderer;