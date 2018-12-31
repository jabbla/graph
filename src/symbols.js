import { createSvgElement, setSvgAttributes } from "./dom";

const symbols = [
    {
        type: 'icon',
        id: 'sql_icon',
        create(){
            let symbol = createSvgElement('symbol');
            let title = createSvgElement('title');
            let g = createSvgElement('g');
            let path = createSvgElement('path');
    
            setSvgAttributes(symbol, {
                width: '24px',
                height: '24px',
                viewBox: '0 0 24 24',
                id: this.id
            });
    
            title.innerHTML = 'sql';
    
            setSvgAttributes(g, {
                id: 'sql',
                transform: 'translate(3, 3)'
            });
    
            setSvgAttributes(path, {
                d: `M8.859,18 
                C1.252,18 0,15.158 0,15.158 
                L0,12.451 C0,12.451 0.984,15.697 8.967,15.697 
                C16.951,15.697 18,12.316 18,12.316 
                L18,15.022 C18,15.022 16.467,18 8.859,18 
                L8.859,18 Z M8.859,13.263 C1.252,13.263 0,10.421 0,10.421 
                L0,7.714 C0,7.714 1.016,10.991 9,10.991 
                C16.984,10.991 18,7.579 18,7.579 L18,10.286 
                C18,10.286 16.467,13.263 8.859,13.263 
                L8.859,13.263 Z M8.859,8.526 
                C1.252,8.526 0,5.729 0,5.729 L0,3.064 
                C0,3.064 0.005,3.076 0.014,3.097 
                C0.164,1.378 4.125,0 9,0 
                C13.778,0 17.676,1.324 17.971,2.995 
                C17.989,2.958 18,2.931 18,2.931 L18,5.595 
                C18,5.595 16.467,8.526 8.859,8.526 L8.859,8.526 
                Z M9,1.895 C5.134,1.895 2,2.955 2,4.263 
                C2,5.571 5.134,6.632 9,6.632 C12.866,6.632 16,5.571 16,4.263 
                C16,2.955 12.866,1.895 9,1.895 L9,1.895 Z`,
                id: 'Shape'
            });
    
            g.appendChild(path);
            symbol.appendChild(title);
            symbol.appendChild(g);
    
            return symbol;
        }
    },
    {
        type: 'icon',
        id: 'spark_icon',
        create(){
            let symbol = createSvgElement('symbol');
            let title = createSvgElement('title');
            let g = createSvgElement('g');
            let g1 = createSvgElement('g');
            let g2 = createSvgElement('g');
            let path = createSvgElement('path');
    
            setSvgAttributes(symbol, {
                width: '24px',
                height: '24px',
                viewBox: '0 0 24 24',
                id: this.id
            });
    
            title.innerHTML = 'spark';
    
            setSvgAttributes(g, {
                id: 'spark',
                transform: 'translate(-223, -123)'
            });
            setSvgAttributes(g1, {
                id: 'result',
                transform: 'translate(118, 127)'
            });
            setSvgAttributes(g2, {
                id: 'script',
                transform: 'translate(77, 98)'
            });
    
            setSvgAttributes(path, {
                d: `M238.737733,136.72389 L242.428948,133.095572 L237.310021,132.329843 L234.999934,127.698078 L232.689848,132.329843 L227.57092,133.095572 L231.262135,136.72389 L230.408551,141.828902 L234.999934,139.43956 L239.591318,141.828902 L238.737733,136.72389 Z M234.999934,141.625468 L229.579277,144.446362 C229.104288,144.693545 228.518853,144.508871 228.27167,144.033883 C228.174524,143.847206 228.140753,143.633988 228.175459,143.426428 L229.183213,137.399372 L224.825308,133.115725 C224.443444,132.740368 224.438169,132.126518 224.813526,131.744654 C224.961047,131.594576 225.153393,131.496571 225.361519,131.465438 L231.405003,130.561407 L234.132327,125.093073 C234.37131,124.613906 234.953486,124.4192 235.432652,124.658183 C235.620971,124.752107 235.773618,124.904754 235.867542,125.093073 L238.594866,130.561407 L244.63835,131.465438 C245.167914,131.544654 245.532993,132.038168 245.453777,132.567733 C245.422644,132.775859 245.324639,132.968204 245.174561,133.115725 L240.816656,137.399372 L241.82441,143.426428 C241.912715,143.954553 241.556171,144.454268 241.028046,144.542573 C240.820486,144.577278 240.607269,144.543508 240.420592,144.446362 L234.999934,141.625468 Z`,
                id: 'Star',
                'fill-rule': 'nonzero'
            });
    
            g.appendChild(g1);
            g.appendChild(g2);
            g.appendChild(path);
            symbol.appendChild(title);
            symbol.appendChild(g);
    
            return symbol;
        }
    },
    {
        id: 'top_anchor',
        create(){
            let symbol = createSvgElement('symbol');
            let title = createSvgElement('title');
            let g = createSvgElement('g');
            let path = createSvgElement('path');
    
            setSvgAttributes(symbol, {
                width: '12px',
                height: '12px',
                viewBox: '0 0 12 12',
                id: this.id
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
    }
];

export const IconMap = symbols.filter(symbol => symbol.type === 'icon').reduce((prev, icon) => {
    prev[icon.id] = true;
    return prev;
}, {}); 

export default symbols;

