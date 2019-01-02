(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.bundle = factory());
}(this, function () { 'use strict';

    class GraphNode {
        constructor(nodeOption){
            this.id = nodeOption.id;
            this.name = nodeOption.name;
            this.links = {
                source: [],
                target: []
            };
            this.nodeOptions = nodeOption;
        }
        addLink(type, linkInst){
            let typedLinks = this.links[type];

            if(!typedLinks.includes(linkInst)){
                typedLinks.push(linkInst);
            }
        }
        getInCount(){
            return this.links.target.length;
        }
        getOutCount(){
            return this.links.source.length;
        }
        getTargetNodes(){
            let { links } = this;

            return links.source.map(link => link.targetNode);
        }
        setLayoutNode(layoutNode){
            return this.layoutNode = layoutNode;
        }
    }

    GraphNode.nodeMap = {};

    const GraphNodeCreator = {
        create(nodeOption){
            let { id } = nodeOption;
            let exist = !!GraphNode.nodeMap[id];
            let node = GraphNode.nodeMap[id] || new GraphNode(nodeOption);
            
            if(!exist){
                GraphNode.nodeMap[id] = node;
            }

            return {exist, node};
        }
    };

    const linkMap = {};

    class GraphLink {
        constructor(linkOption, options){
            let { source, target } = linkOption;
            let id = `${source}#!#@#${target}`;
            let {nodes} = options;

            this.linkOption = this.mergeLinkOptions(linkOption, options);
            this.id = id;
            
            this.sourceNode = this.buildNode('source', linkOption.source, nodes);
            this.targetNode = this.buildNode('target', linkOption.target, nodes);
        }
        buildNode(type, nodeId, nodes){
            let nodeRes = GraphNodeCreator.create(nodes.find(node => node.id === nodeId));
        
            nodeRes.node.addLink(type, this);
            
            return nodeRes.node;
        }
        mergeLinkOptions(linkOption, options){
            let {linkConfig} = options;
            let defaultLinkConfig = {
                linkType: 'curve'
            };

            return Object.assign(defaultLinkConfig, linkConfig || {}, linkOption);
        }
    }

    const GraphLinkCreator = {
        create(linkOption, options){
            let { source, target } = linkOption;
            let id = `${source}#!#@#${target}`;
            let exist = !!linkMap[id];
            let link = linkMap[id] || new GraphLink(linkOption, options);

            if(exist){
                linkMap[id] = link;
            }

            return {exist, link};
        }
    };

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

    const symbols = [
        {
            type: 'icon',
            id: 'sql_icon',
            color: '#dc254c',
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
            color: '#d9b70a',
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
        
                title.innerHTML = 'arrow';
        
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

    const IconMap = symbols.filter(symbol => symbol.type === 'icon').reduce((prev, icon) => {
        prev[icon.id] = icon;
        return prev;
    }, {});

    function getTextLength(text, lengthLimit){
        let doublePattern = /[^\x00-\xff]/;
        let length = 0;
        let index = text.length - 1;

        for(let i = 0; i < text.length; i++){
            if(doublePattern.test(text[i])){
                length += 2;
            }else{
                length += 1;
            }

            if(length >= lengthLimit){
                index = i;
                lengthLimit = text.length*3;
            }
        }

        return {
            length,
            index
        };
    }

    function textEllipsis(text, length){
        let { length: textLength, index } = getTextLength(text, length);
        if(textLength > length){
            return text.slice(0, (index - 2)) + '...';
        }
        return text;
    }

    function mergeObject(source1, source2, deep){
        let value = function(value1, value2){
            let val2Undefined = typeof value2 === 'undefined';
            let res = val2Undefined? value1 : value2;
            return res;
        };
        let deepAssign = (function(){
            var assignSingle = function(target, source){
                for(var key in source){
                    if(typeof target[key] !== 'object' || typeof source[key] !== 'object'){
                        target[key] = value(target[key], source[key]);
                    }else{
                        assignSingle(target[key], source[key]);
                    }
                }
                return target;
            };
        
            return function(){
                var args = [].slice.call(arguments, 0);
                var result = args[0];
        
                args.slice(1).forEach(function(item){
                    assignSingle(result, item);
                });
                return result;
            };
        })();

        return deep? deepAssign({}, source1, source2) : Object.assign({}, source1, source2);
    }

    class LayoutNode {
        constructor(graphNode, info, globalNodeConfig){
            this.graphNode = graphNode;
            this.info = info;
            this.globalNodeConfig = globalNodeConfig;
            this.nodeConfig = mergeObject(globalNodeConfig, graphNode.nodeOptions, true);
            
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

    class LayoutLink {
        constructor(graphLink){
            this.graphLink = graphLink;
        }
        createElement(layoutNodeMap){
            const { graphLink } = this;
            const { sourceNode, targetNode } = graphLink;

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
        
    }

    // svg-pan-zoom v3.6.0
    // https://github.com/ariutta/svg-pan-zoom
    !function t(e,o,n){function i(r,a){if(!o[r]){if(!e[r]){var l="function"==typeof require&&require;if(!a&&l)return l(r,!0);if(s)return s(r,!0);var u=new Error("Cannot find module '"+r+"'");throw u.code="MODULE_NOT_FOUND",u}var h=o[r]={exports:{}};e[r][0].call(h.exports,function(t){var o=e[r][1][t];return i(o?o:t)},h,h.exports,t,e,o,n);}return o[r].exports}for(var s="function"==typeof require&&require,r=0;r<n.length;r++)i(n[r]);return i}({1:[function(t,e,o){var n=t("./svg-pan-zoom.js");!function(t,o){"function"==typeof define&&define.amd?define("svg-pan-zoom",function(){return n}):"undefined"!=typeof e&&e.exports&&(e.exports=n,t.svgPanZoom=n);}(window,document);},{"./svg-pan-zoom.js":4}],2:[function(t,e,o){var n=t("./svg-utilities");e.exports={enable:function(t){var e=t.svg.querySelector("defs");e||(e=document.createElementNS(n.svgNS,"defs"),t.svg.appendChild(e));var o=e.querySelector("style#svg-pan-zoom-controls-styles");if(!o){var i=document.createElementNS(n.svgNS,"style");i.setAttribute("id","svg-pan-zoom-controls-styles"),i.setAttribute("type","text/css"),i.textContent=".svg-pan-zoom-control { cursor: pointer; fill: black; fill-opacity: 0.333; } .svg-pan-zoom-control:hover { fill-opacity: 0.8; } .svg-pan-zoom-control-background { fill: white; fill-opacity: 0.5; } .svg-pan-zoom-control-background { fill-opacity: 0.8; }",e.appendChild(i);}var s=document.createElementNS(n.svgNS,"g");s.setAttribute("id","svg-pan-zoom-controls"),s.setAttribute("transform","translate("+(t.width-70)+" "+(t.height-76)+") scale(0.75)"),s.setAttribute("class","svg-pan-zoom-control"),s.appendChild(this._createZoomIn(t)),s.appendChild(this._createZoomReset(t)),s.appendChild(this._createZoomOut(t)),t.svg.appendChild(s),t.controlIcons=s;},_createZoomIn:function(t){var e=document.createElementNS(n.svgNS,"g");e.setAttribute("id","svg-pan-zoom-zoom-in"),e.setAttribute("transform","translate(30.5 5) scale(0.015)"),e.setAttribute("class","svg-pan-zoom-control"),e.addEventListener("click",function(){t.getPublicInstance().zoomIn();},!1),e.addEventListener("touchstart",function(){t.getPublicInstance().zoomIn();},!1);var o=document.createElementNS(n.svgNS,"rect");o.setAttribute("x","0"),o.setAttribute("y","0"),o.setAttribute("width","1500"),o.setAttribute("height","1400"),o.setAttribute("class","svg-pan-zoom-control-background"),e.appendChild(o);var i=document.createElementNS(n.svgNS,"path");return i.setAttribute("d","M1280 576v128q0 26 -19 45t-45 19h-320v320q0 26 -19 45t-45 19h-128q-26 0 -45 -19t-19 -45v-320h-320q-26 0 -45 -19t-19 -45v-128q0 -26 19 -45t45 -19h320v-320q0 -26 19 -45t45 -19h128q26 0 45 19t19 45v320h320q26 0 45 19t19 45zM1536 1120v-960 q0 -119 -84.5 -203.5t-203.5 -84.5h-960q-119 0 -203.5 84.5t-84.5 203.5v960q0 119 84.5 203.5t203.5 84.5h960q119 0 203.5 -84.5t84.5 -203.5z"),i.setAttribute("class","svg-pan-zoom-control-element"),e.appendChild(i),e},_createZoomReset:function(t){var e=document.createElementNS(n.svgNS,"g");e.setAttribute("id","svg-pan-zoom-reset-pan-zoom"),e.setAttribute("transform","translate(5 35) scale(0.4)"),e.setAttribute("class","svg-pan-zoom-control"),e.addEventListener("click",function(){t.getPublicInstance().reset();},!1),e.addEventListener("touchstart",function(){t.getPublicInstance().reset();},!1);var o=document.createElementNS(n.svgNS,"rect");o.setAttribute("x","2"),o.setAttribute("y","2"),o.setAttribute("width","182"),o.setAttribute("height","58"),o.setAttribute("class","svg-pan-zoom-control-background"),e.appendChild(o);var i=document.createElementNS(n.svgNS,"path");i.setAttribute("d","M33.051,20.632c-0.742-0.406-1.854-0.609-3.338-0.609h-7.969v9.281h7.769c1.543,0,2.701-0.188,3.473-0.562c1.365-0.656,2.048-1.953,2.048-3.891C35.032,22.757,34.372,21.351,33.051,20.632z"),i.setAttribute("class","svg-pan-zoom-control-element"),e.appendChild(i);var s=document.createElementNS(n.svgNS,"path");return s.setAttribute("d","M170.231,0.5H15.847C7.102,0.5,0.5,5.708,0.5,11.84v38.861C0.5,56.833,7.102,61.5,15.847,61.5h154.384c8.745,0,15.269-4.667,15.269-10.798V11.84C185.5,5.708,178.976,0.5,170.231,0.5z M42.837,48.569h-7.969c-0.219-0.766-0.375-1.383-0.469-1.852c-0.188-0.969-0.289-1.961-0.305-2.977l-0.047-3.211c-0.03-2.203-0.41-3.672-1.142-4.406c-0.732-0.734-2.103-1.102-4.113-1.102h-7.05v13.547h-7.055V14.022h16.524c2.361,0.047,4.178,0.344,5.45,0.891c1.272,0.547,2.351,1.352,3.234,2.414c0.731,0.875,1.31,1.844,1.737,2.906s0.64,2.273,0.64,3.633c0,1.641-0.414,3.254-1.242,4.84s-2.195,2.707-4.102,3.363c1.594,0.641,2.723,1.551,3.387,2.73s0.996,2.98,0.996,5.402v2.32c0,1.578,0.063,2.648,0.19,3.211c0.19,0.891,0.635,1.547,1.333,1.969V48.569z M75.579,48.569h-26.18V14.022h25.336v6.117H56.454v7.336h16.781v6H56.454v8.883h19.125V48.569z M104.497,46.331c-2.44,2.086-5.887,3.129-10.34,3.129c-4.548,0-8.125-1.027-10.731-3.082s-3.909-4.879-3.909-8.473h6.891c0.224,1.578,0.662,2.758,1.316,3.539c1.196,1.422,3.246,2.133,6.15,2.133c1.739,0,3.151-0.188,4.236-0.562c2.058-0.719,3.087-2.055,3.087-4.008c0-1.141-0.504-2.023-1.512-2.648c-1.008-0.609-2.607-1.148-4.796-1.617l-3.74-0.82c-3.676-0.812-6.201-1.695-7.576-2.648c-2.328-1.594-3.492-4.086-3.492-7.477c0-3.094,1.139-5.664,3.417-7.711s5.623-3.07,10.036-3.07c3.685,0,6.829,0.965,9.431,2.895c2.602,1.93,3.966,4.73,4.093,8.402h-6.938c-0.128-2.078-1.057-3.555-2.787-4.43c-1.154-0.578-2.587-0.867-4.301-0.867c-1.907,0-3.428,0.375-4.565,1.125c-1.138,0.75-1.706,1.797-1.706,3.141c0,1.234,0.561,2.156,1.682,2.766c0.721,0.406,2.25,0.883,4.589,1.43l6.063,1.43c2.657,0.625,4.648,1.461,5.975,2.508c2.059,1.625,3.089,3.977,3.089,7.055C108.157,41.624,106.937,44.245,104.497,46.331z M139.61,48.569h-26.18V14.022h25.336v6.117h-18.281v7.336h16.781v6h-16.781v8.883h19.125V48.569z M170.337,20.14h-10.336v28.43h-7.266V20.14h-10.383v-6.117h27.984V20.14z"),s.setAttribute("class","svg-pan-zoom-control-element"),e.appendChild(s),e},_createZoomOut:function(t){var e=document.createElementNS(n.svgNS,"g");e.setAttribute("id","svg-pan-zoom-zoom-out"),e.setAttribute("transform","translate(30.5 70) scale(0.015)"),e.setAttribute("class","svg-pan-zoom-control"),e.addEventListener("click",function(){t.getPublicInstance().zoomOut();},!1),e.addEventListener("touchstart",function(){t.getPublicInstance().zoomOut();},!1);var o=document.createElementNS(n.svgNS,"rect");o.setAttribute("x","0"),o.setAttribute("y","0"),o.setAttribute("width","1500"),o.setAttribute("height","1400"),o.setAttribute("class","svg-pan-zoom-control-background"),e.appendChild(o);var i=document.createElementNS(n.svgNS,"path");return i.setAttribute("d","M1280 576v128q0 26 -19 45t-45 19h-896q-26 0 -45 -19t-19 -45v-128q0 -26 19 -45t45 -19h896q26 0 45 19t19 45zM1536 1120v-960q0 -119 -84.5 -203.5t-203.5 -84.5h-960q-119 0 -203.5 84.5t-84.5 203.5v960q0 119 84.5 203.5t203.5 84.5h960q119 0 203.5 -84.5 t84.5 -203.5z"),i.setAttribute("class","svg-pan-zoom-control-element"),e.appendChild(i),e},disable:function(t){t.controlIcons&&(t.controlIcons.parentNode.removeChild(t.controlIcons),t.controlIcons=null);}};},{"./svg-utilities":5}],3:[function(t,e,o){var n=t("./svg-utilities"),i=t("./utilities"),s=function(t,e){this.init(t,e);};s.prototype.init=function(t,e){this.viewport=t,this.options=e,this.originalState={zoom:1,x:0,y:0},this.activeState={zoom:1,x:0,y:0},this.updateCTMCached=i.proxy(this.updateCTM,this),this.requestAnimationFrame=i.createRequestAnimationFrame(this.options.refreshRate),this.viewBox={x:0,y:0,width:0,height:0},this.cacheViewBox();var o=this.processCTM();this.setCTM(o),this.updateCTM();},s.prototype.cacheViewBox=function(){var t=this.options.svg.getAttribute("viewBox");if(t){var e=t.split(/[\s\,]/).filter(function(t){return t}).map(parseFloat);this.viewBox.x=e[0],this.viewBox.y=e[1],this.viewBox.width=e[2],this.viewBox.height=e[3];var o=Math.min(this.options.width/this.viewBox.width,this.options.height/this.viewBox.height);this.activeState.zoom=o,this.activeState.x=(this.options.width-this.viewBox.width*o)/2,this.activeState.y=(this.options.height-this.viewBox.height*o)/2,this.updateCTMOnNextFrame(),this.options.svg.removeAttribute("viewBox");}else this.simpleViewBoxCache();},s.prototype.simpleViewBoxCache=function(){var t=this.viewport.getBBox();this.viewBox.x=t.x,this.viewBox.y=t.y,this.viewBox.width=t.width,this.viewBox.height=t.height;},s.prototype.getViewBox=function(){return i.extend({},this.viewBox)},s.prototype.processCTM=function(){var t=this.getCTM();if(this.options.fit||this.options.contain){var e;e=this.options.fit?Math.min(this.options.width/this.viewBox.width,this.options.height/this.viewBox.height):Math.max(this.options.width/this.viewBox.width,this.options.height/this.viewBox.height),t.a=e,t.d=e,t.e=-this.viewBox.x*e,t.f=-this.viewBox.y*e;}if(this.options.center){var o=.5*(this.options.width-(this.viewBox.width+2*this.viewBox.x)*t.a),n=.5*(this.options.height-(this.viewBox.height+2*this.viewBox.y)*t.a);t.e=o,t.f=n;}return this.originalState.zoom=t.a,this.originalState.x=t.e,this.originalState.y=t.f,t},s.prototype.getOriginalState=function(){return i.extend({},this.originalState)},s.prototype.getState=function(){return i.extend({},this.activeState)},s.prototype.getZoom=function(){return this.activeState.zoom},s.prototype.getRelativeZoom=function(){return this.activeState.zoom/this.originalState.zoom},s.prototype.computeRelativeZoom=function(t){return t/this.originalState.zoom},s.prototype.getPan=function(){return {x:this.activeState.x,y:this.activeState.y}},s.prototype.getCTM=function(){var t=this.options.svg.createSVGMatrix();return t.a=this.activeState.zoom,t.b=0,t.c=0,t.d=this.activeState.zoom,t.e=this.activeState.x,t.f=this.activeState.y,t},s.prototype.setCTM=function(t){var e=this.isZoomDifferent(t),o=this.isPanDifferent(t);if(e||o){if(e&&(this.options.beforeZoom(this.getRelativeZoom(),this.computeRelativeZoom(t.a))===!1?(t.a=t.d=this.activeState.zoom,e=!1):(this.updateCache(t),this.options.onZoom(this.getRelativeZoom()))),o){var n=this.options.beforePan(this.getPan(),{x:t.e,y:t.f}),s=!1,r=!1;n===!1?(t.e=this.getPan().x,t.f=this.getPan().y,s=r=!0):i.isObject(n)&&(n.x===!1?(t.e=this.getPan().x,s=!0):i.isNumber(n.x)&&(t.e=n.x),n.y===!1?(t.f=this.getPan().y,r=!0):i.isNumber(n.y)&&(t.f=n.y)),s&&r||!this.isPanDifferent(t)?o=!1:(this.updateCache(t),this.options.onPan(this.getPan()));}(e||o)&&this.updateCTMOnNextFrame();}},s.prototype.isZoomDifferent=function(t){return this.activeState.zoom!==t.a},s.prototype.isPanDifferent=function(t){return this.activeState.x!==t.e||this.activeState.y!==t.f},s.prototype.updateCache=function(t){this.activeState.zoom=t.a,this.activeState.x=t.e,this.activeState.y=t.f;},s.prototype.pendingUpdate=!1,s.prototype.updateCTMOnNextFrame=function(){this.pendingUpdate||(this.pendingUpdate=!0,this.requestAnimationFrame.call(window,this.updateCTMCached));},s.prototype.updateCTM=function(){var t=this.getCTM();n.setCTM(this.viewport,t,this.defs),this.pendingUpdate=!1,this.options.onUpdatedCTM&&this.options.onUpdatedCTM(t);},e.exports=function(t,e){return new s(t,e)};},{"./svg-utilities":5,"./utilities":7}],4:[function(t,e,o){var n=t("./uniwheel"),i=t("./control-icons"),s=t("./utilities"),r=t("./svg-utilities"),a=t("./shadow-viewport"),l=function(t,e){this.init(t,e);},u={viewportSelector:".svg-pan-zoom_viewport",panEnabled:!0,controlIconsEnabled:!1,zoomEnabled:!0,dblClickZoomEnabled:!0,mouseWheelZoomEnabled:!0,preventMouseEventsDefault:!0,zoomScaleSensitivity:.1,minZoom:.5,maxZoom:10,fit:!0,contain:!1,center:!0,refreshRate:"auto",beforeZoom:null,onZoom:null,beforePan:null,onPan:null,customEventsHandler:null,eventsListenerElement:null,onUpdatedCTM:null},h={passive:!0};l.prototype.init=function(t,e){var o=this;this.svg=t,this.defs=t.querySelector("defs"),r.setupSvgAttributes(this.svg),this.options=s.extend(s.extend({},u),e),this.state="none";var n=r.getBoundingClientRectNormalized(t);this.width=n.width,this.height=n.height,this.viewport=a(r.getOrCreateViewport(this.svg,this.options.viewportSelector),{svg:this.svg,width:this.width,height:this.height,fit:this.options.fit,contain:this.options.contain,center:this.options.center,refreshRate:this.options.refreshRate,beforeZoom:function(t,e){if(o.viewport&&o.options.beforeZoom)return o.options.beforeZoom(t,e)},onZoom:function(t){if(o.viewport&&o.options.onZoom)return o.options.onZoom(t)},beforePan:function(t,e){if(o.viewport&&o.options.beforePan)return o.options.beforePan(t,e)},onPan:function(t){if(o.viewport&&o.options.onPan)return o.options.onPan(t)},onUpdatedCTM:function(t){if(o.viewport&&o.options.onUpdatedCTM)return o.options.onUpdatedCTM(t)}});var l=this.getPublicInstance();l.setBeforeZoom(this.options.beforeZoom),l.setOnZoom(this.options.onZoom),l.setBeforePan(this.options.beforePan),l.setOnPan(this.options.onPan),l.setOnUpdatedCTM(this.options.onUpdatedCTM),this.options.controlIconsEnabled&&i.enable(this),this.lastMouseWheelEventTime=Date.now(),this.setupHandlers();},l.prototype.setupHandlers=function(){var t=this,e=null;if(this.eventListeners={mousedown:function(o){var n=t.handleMouseDown(o,e);return e=o,n},touchstart:function(o){var n=t.handleMouseDown(o,e);return e=o,n},mouseup:function(e){return t.handleMouseUp(e)},touchend:function(e){return t.handleMouseUp(e)},mousemove:function(e){return t.handleMouseMove(e)},touchmove:function(e){return t.handleMouseMove(e)},mouseleave:function(e){return t.handleMouseUp(e)},touchleave:function(e){return t.handleMouseUp(e)},touchcancel:function(e){return t.handleMouseUp(e)}},null!=this.options.customEventsHandler){this.options.customEventsHandler.init({svgElement:this.svg,eventsListenerElement:this.options.eventsListenerElement,instance:this.getPublicInstance()});var o=this.options.customEventsHandler.haltEventListeners;if(o&&o.length)for(var n=o.length-1;n>=0;n--)this.eventListeners.hasOwnProperty(o[n])&&delete this.eventListeners[o[n]];}for(var i in this.eventListeners)(this.options.eventsListenerElement||this.svg).addEventListener(i,this.eventListeners[i],!this.options.preventMouseEventsDefault&&h);this.options.mouseWheelZoomEnabled&&(this.options.mouseWheelZoomEnabled=!1,this.enableMouseWheelZoom());},l.prototype.enableMouseWheelZoom=function(){if(!this.options.mouseWheelZoomEnabled){var t=this;this.wheelListener=function(e){return t.handleMouseWheel(e)};var e=!this.options.preventMouseEventsDefault;n.on(this.options.eventsListenerElement||this.svg,this.wheelListener,e),this.options.mouseWheelZoomEnabled=!0;}},l.prototype.disableMouseWheelZoom=function(){if(this.options.mouseWheelZoomEnabled){var t=!this.options.preventMouseEventsDefault;n.off(this.options.eventsListenerElement||this.svg,this.wheelListener,t),this.options.mouseWheelZoomEnabled=!1;}},l.prototype.handleMouseWheel=function(t){if(this.options.zoomEnabled&&"none"===this.state){this.options.preventMouseEventsDefault&&(t.preventDefault?t.preventDefault():t.returnValue=!1);var e=t.deltaY||1,o=Date.now()-this.lastMouseWheelEventTime,n=3+Math.max(0,30-o);this.lastMouseWheelEventTime=Date.now(),"deltaMode"in t&&0===t.deltaMode&&t.wheelDelta&&(e=0===t.deltaY?0:Math.abs(t.wheelDelta)/t.deltaY),e=-.3<e&&e<.3?e:(e>0?1:-1)*Math.log(Math.abs(e)+10)/n;var i=this.svg.getScreenCTM().inverse(),s=r.getEventPoint(t,this.svg).matrixTransform(i),a=Math.pow(1+this.options.zoomScaleSensitivity,-1*e);this.zoomAtPoint(a,s);}},l.prototype.zoomAtPoint=function(t,e,o){var n=this.viewport.getOriginalState();o?(t=Math.max(this.options.minZoom*n.zoom,Math.min(this.options.maxZoom*n.zoom,t)),t/=this.getZoom()):this.getZoom()*t<this.options.minZoom*n.zoom?t=this.options.minZoom*n.zoom/this.getZoom():this.getZoom()*t>this.options.maxZoom*n.zoom&&(t=this.options.maxZoom*n.zoom/this.getZoom());var i=this.viewport.getCTM(),s=e.matrixTransform(i.inverse()),r=this.svg.createSVGMatrix().translate(s.x,s.y).scale(t).translate(-s.x,-s.y),a=i.multiply(r);a.a!==i.a&&this.viewport.setCTM(a);},l.prototype.zoom=function(t,e){this.zoomAtPoint(t,r.getSvgCenterPoint(this.svg,this.width,this.height),e);},l.prototype.publicZoom=function(t,e){e&&(t=this.computeFromRelativeZoom(t)),this.zoom(t,e);},l.prototype.publicZoomAtPoint=function(t,e,o){if(o&&(t=this.computeFromRelativeZoom(t)),"SVGPoint"!==s.getType(e)){if(!("x"in e&&"y"in e))throw new Error("Given point is invalid");e=r.createSVGPoint(this.svg,e.x,e.y);}this.zoomAtPoint(t,e,o);},l.prototype.getZoom=function(){return this.viewport.getZoom()},l.prototype.getRelativeZoom=function(){return this.viewport.getRelativeZoom()},l.prototype.computeFromRelativeZoom=function(t){return t*this.viewport.getOriginalState().zoom},l.prototype.resetZoom=function(){var t=this.viewport.getOriginalState();this.zoom(t.zoom,!0);},l.prototype.resetPan=function(){this.pan(this.viewport.getOriginalState());},l.prototype.reset=function(){this.resetZoom(),this.resetPan();},l.prototype.handleDblClick=function(t){if(this.options.preventMouseEventsDefault&&(t.preventDefault?t.preventDefault():t.returnValue=!1),this.options.controlIconsEnabled){var e=t.target.getAttribute("class")||"";if(e.indexOf("svg-pan-zoom-control")>-1)return !1}var o;o=t.shiftKey?1/(2*(1+this.options.zoomScaleSensitivity)):2*(1+this.options.zoomScaleSensitivity);var n=r.getEventPoint(t,this.svg).matrixTransform(this.svg.getScreenCTM().inverse());this.zoomAtPoint(o,n);},l.prototype.handleMouseDown=function(t,e){this.options.preventMouseEventsDefault&&(t.preventDefault?t.preventDefault():t.returnValue=!1),s.mouseAndTouchNormalize(t,this.svg),this.options.dblClickZoomEnabled&&s.isDblClick(t,e)?this.handleDblClick(t):(this.state="pan",this.firstEventCTM=this.viewport.getCTM(),this.stateOrigin=r.getEventPoint(t,this.svg).matrixTransform(this.firstEventCTM.inverse()));},l.prototype.handleMouseMove=function(t){if(this.options.preventMouseEventsDefault&&(t.preventDefault?t.preventDefault():t.returnValue=!1),"pan"===this.state&&this.options.panEnabled){var e=r.getEventPoint(t,this.svg).matrixTransform(this.firstEventCTM.inverse()),o=this.firstEventCTM.translate(e.x-this.stateOrigin.x,e.y-this.stateOrigin.y);this.viewport.setCTM(o);}},l.prototype.handleMouseUp=function(t){this.options.preventMouseEventsDefault&&(t.preventDefault?t.preventDefault():t.returnValue=!1),"pan"===this.state&&(this.state="none");},l.prototype.fit=function(){var t=this.viewport.getViewBox(),e=Math.min(this.width/t.width,this.height/t.height);this.zoom(e,!0);},l.prototype.contain=function(){var t=this.viewport.getViewBox(),e=Math.max(this.width/t.width,this.height/t.height);this.zoom(e,!0);},l.prototype.center=function(){var t=this.viewport.getViewBox(),e=.5*(this.width-(t.width+2*t.x)*this.getZoom()),o=.5*(this.height-(t.height+2*t.y)*this.getZoom());this.getPublicInstance().pan({x:e,y:o});},l.prototype.updateBBox=function(){this.viewport.simpleViewBoxCache();},l.prototype.pan=function(t){var e=this.viewport.getCTM();e.e=t.x,e.f=t.y,this.viewport.setCTM(e);},l.prototype.panBy=function(t){var e=this.viewport.getCTM();e.e+=t.x,e.f+=t.y,this.viewport.setCTM(e);},l.prototype.getPan=function(){var t=this.viewport.getState();return {x:t.x,y:t.y}},l.prototype.resize=function(){var t=r.getBoundingClientRectNormalized(this.svg);this.width=t.width,this.height=t.height;var e=this.viewport;e.options.width=this.width,e.options.height=this.height,e.processCTM(),this.options.controlIconsEnabled&&(this.getPublicInstance().disableControlIcons(),this.getPublicInstance().enableControlIcons());},l.prototype.destroy=function(){var t=this;this.beforeZoom=null,this.onZoom=null,this.beforePan=null,this.onPan=null,this.onUpdatedCTM=null,null!=this.options.customEventsHandler&&this.options.customEventsHandler.destroy({svgElement:this.svg,eventsListenerElement:this.options.eventsListenerElement,instance:this.getPublicInstance()});for(var e in this.eventListeners)(this.options.eventsListenerElement||this.svg).removeEventListener(e,this.eventListeners[e],!this.options.preventMouseEventsDefault&&h);this.disableMouseWheelZoom(),this.getPublicInstance().disableControlIcons(),this.reset(),c=c.filter(function(e){return e.svg!==t.svg}),delete this.options,delete this.viewport,delete this.publicInstance,delete this.pi,this.getPublicInstance=function(){return null};},l.prototype.getPublicInstance=function(){var t=this;return this.publicInstance||(this.publicInstance=this.pi={enablePan:function(){return t.options.panEnabled=!0,t.pi},disablePan:function(){return t.options.panEnabled=!1,t.pi},isPanEnabled:function(){return !!t.options.panEnabled},pan:function(e){return t.pan(e),t.pi},panBy:function(e){return t.panBy(e),t.pi},getPan:function(){return t.getPan()},setBeforePan:function(e){return t.options.beforePan=null===e?null:s.proxy(e,t.publicInstance),t.pi},setOnPan:function(e){return t.options.onPan=null===e?null:s.proxy(e,t.publicInstance),t.pi},enableZoom:function(){return t.options.zoomEnabled=!0,t.pi},disableZoom:function(){return t.options.zoomEnabled=!1,t.pi},isZoomEnabled:function(){return !!t.options.zoomEnabled},enableControlIcons:function(){return t.options.controlIconsEnabled||(t.options.controlIconsEnabled=!0,i.enable(t)),t.pi},disableControlIcons:function(){return t.options.controlIconsEnabled&&(t.options.controlIconsEnabled=!1,i.disable(t)),t.pi},isControlIconsEnabled:function(){return !!t.options.controlIconsEnabled},enableDblClickZoom:function(){return t.options.dblClickZoomEnabled=!0,t.pi},disableDblClickZoom:function(){return t.options.dblClickZoomEnabled=!1,t.pi},isDblClickZoomEnabled:function(){return !!t.options.dblClickZoomEnabled},enableMouseWheelZoom:function(){return t.enableMouseWheelZoom(),t.pi},disableMouseWheelZoom:function(){return t.disableMouseWheelZoom(),t.pi},isMouseWheelZoomEnabled:function(){return !!t.options.mouseWheelZoomEnabled},setZoomScaleSensitivity:function(e){return t.options.zoomScaleSensitivity=e,t.pi},setMinZoom:function(e){return t.options.minZoom=e,t.pi},setMaxZoom:function(e){return t.options.maxZoom=e,t.pi},setBeforeZoom:function(e){return t.options.beforeZoom=null===e?null:s.proxy(e,t.publicInstance),t.pi},setOnZoom:function(e){return t.options.onZoom=null===e?null:s.proxy(e,t.publicInstance),t.pi},zoom:function(e){return t.publicZoom(e,!0),t.pi},zoomBy:function(e){return t.publicZoom(e,!1),t.pi},zoomAtPoint:function(e,o){return t.publicZoomAtPoint(e,o,!0),t.pi},zoomAtPointBy:function(e,o){return t.publicZoomAtPoint(e,o,!1),t.pi},zoomIn:function(){return this.zoomBy(1+t.options.zoomScaleSensitivity),t.pi},zoomOut:function(){return this.zoomBy(1/(1+t.options.zoomScaleSensitivity)),t.pi},getZoom:function(){return t.getRelativeZoom()},setOnUpdatedCTM:function(e){return t.options.onUpdatedCTM=null===e?null:s.proxy(e,t.publicInstance),t.pi},resetZoom:function(){return t.resetZoom(),t.pi},resetPan:function(){return t.resetPan(),t.pi},reset:function(){return t.reset(),t.pi},fit:function(){return t.fit(),t.pi},contain:function(){return t.contain(),t.pi},center:function(){return t.center(),t.pi},updateBBox:function(){return t.updateBBox(),t.pi},resize:function(){return t.resize(),t.pi},getSizes:function(){return {width:t.width,height:t.height,realZoom:t.getZoom(),viewBox:t.viewport.getViewBox()}},destroy:function(){return t.destroy(),t.pi}}),this.publicInstance};var c=[],p=function(t,e){var o=s.getSvg(t);if(null===o)return null;for(var n=c.length-1;n>=0;n--)if(c[n].svg===o)return c[n].instance.getPublicInstance();return c.push({svg:o,instance:new l(o,e)}),c[c.length-1].instance.getPublicInstance()};e.exports=p;},{"./control-icons":2,"./shadow-viewport":3,"./svg-utilities":5,"./uniwheel":6,"./utilities":7}],5:[function(t,e,o){var n=t("./utilities"),i="unknown";document.documentMode&&(i="ie"),e.exports={svgNS:"http://www.w3.org/2000/svg",xmlNS:"http://www.w3.org/XML/1998/namespace",xmlnsNS:"http://www.w3.org/2000/xmlns/",xlinkNS:"http://www.w3.org/1999/xlink",evNS:"http://www.w3.org/2001/xml-events",getBoundingClientRectNormalized:function(t){if(t.clientWidth&&t.clientHeight)return {width:t.clientWidth,height:t.clientHeight};if(t.getBoundingClientRect())return t.getBoundingClientRect();throw new Error("Cannot get BoundingClientRect for SVG.")},getOrCreateViewport:function(t,e){var o=null;if(o=n.isElement(e)?e:t.querySelector(e),!o){var i=Array.prototype.slice.call(t.childNodes||t.children).filter(function(t){return "defs"!==t.nodeName&&"#text"!==t.nodeName});1===i.length&&"g"===i[0].nodeName&&null===i[0].getAttribute("transform")&&(o=i[0]);}if(!o){var s="viewport-"+(new Date).toISOString().replace(/\D/g,"");o=document.createElementNS(this.svgNS,"g"),o.setAttribute("id",s);var r=t.childNodes||t.children;if(r&&r.length>0)for(var a=r.length;a>0;a--)"defs"!==r[r.length-a].nodeName&&o.appendChild(r[r.length-a]);t.appendChild(o);}var l=[];return o.getAttribute("class")&&(l=o.getAttribute("class").split(" ")),~l.indexOf("svg-pan-zoom_viewport")||(l.push("svg-pan-zoom_viewport"),o.setAttribute("class",l.join(" "))),o},setupSvgAttributes:function(t){if(t.setAttribute("xmlns",this.svgNS),t.setAttributeNS(this.xmlnsNS,"xmlns:xlink",this.xlinkNS),t.setAttributeNS(this.xmlnsNS,"xmlns:ev",this.evNS),null!==t.parentNode){var e=t.getAttribute("style")||"";e.toLowerCase().indexOf("overflow")===-1&&t.setAttribute("style","overflow: hidden; "+e);}},internetExplorerRedisplayInterval:300,refreshDefsGlobal:n.throttle(function(){for(var t=document.querySelectorAll("defs"),e=t.length,o=0;o<e;o++){var n=t[o];n.parentNode.insertBefore(n,n);}},this?this.internetExplorerRedisplayInterval:null),setCTM:function(t,e,o){var n=this,s="matrix("+e.a+","+e.b+","+e.c+","+e.d+","+e.e+","+e.f+")";t.setAttributeNS(null,"transform",s),"transform"in t.style?t.style.transform=s:"-ms-transform"in t.style?t.style["-ms-transform"]=s:"-webkit-transform"in t.style&&(t.style["-webkit-transform"]=s),"ie"===i&&o&&(o.parentNode.insertBefore(o,o),window.setTimeout(function(){n.refreshDefsGlobal();},n.internetExplorerRedisplayInterval));},getEventPoint:function(t,e){var o=e.createSVGPoint();return n.mouseAndTouchNormalize(t,e),o.x=t.clientX,o.y=t.clientY,o},getSvgCenterPoint:function(t,e,o){return this.createSVGPoint(t,e/2,o/2)},createSVGPoint:function(t,e,o){var n=t.createSVGPoint();return n.x=e,n.y=o,n}};},{"./utilities":7}],6:[function(t,e,o){e.exports=function(){function t(t,e){var o=function(t){!t&&(t=window.event);var o={originalEvent:t,target:t.target||t.srcElement,type:"wheel",deltaMode:"MozMousePixelScroll"==t.type?0:1,deltaX:0,delatZ:0,preventDefault:function(){t.preventDefault?t.preventDefault():t.returnValue=!1;}};return "mousewheel"==u?(o.deltaY=-.025*t.wheelDelta,t.wheelDeltaX&&(o.deltaX=-.025*t.wheelDeltaX)):o.deltaY=t.detail,e(o)};return c.push({element:t,fn:o}),o}function e(t){for(var e=0;e<c.length;e++)if(c[e].element===t)return c[e].fn;return function(){}}function o(t){for(var e=0;e<c.length;e++)if(c[e].element===t)return c.splice(e,1)}function n(e,o,n,i){var s;s="wheel"===u?n:t(e,n),e[a](h+o,s,!!i&&p);}function i(t,n,i,s){var r;r="wheel"===u?i:e(t),t[l](h+n,r,!!s&&p),o(t);}function s(t,e,o){n(t,u,e,o),"DOMMouseScroll"==u&&n(t,"MozMousePixelScroll",e,o);}function r(t,e,o){i(t,u,e,o),"DOMMouseScroll"==u&&i(t,"MozMousePixelScroll",e,o);}var a,l,u,h="",c=[],p={passive:!0};return window.addEventListener?(a="addEventListener",l="removeEventListener"):(a="attachEvent",l="detachEvent",h="on"),u="onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll",{on:s,off:r}}();},{}],7:[function(t,e,o){function n(t){return function(e){window.setTimeout(e,t);}}e.exports={extend:function(t,e){t=t||{};for(var o in e)this.isObject(e[o])?t[o]=this.extend(t[o],e[o]):t[o]=e[o];return t},isElement:function(t){return t instanceof HTMLElement||t instanceof SVGElement||t instanceof SVGSVGElement||t&&"object"==typeof t&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName},isObject:function(t){return "[object Object]"===Object.prototype.toString.call(t)},isNumber:function(t){return !isNaN(parseFloat(t))&&isFinite(t)},getSvg:function(t){var e,o;if(this.isElement(t))e=t;else{if(!("string"==typeof t||t instanceof String))throw new Error("Provided selector is not an HTML object nor String");if(e=document.querySelector(t),!e)throw new Error("Provided selector did not find any elements. Selector: "+t)}if("svg"===e.tagName.toLowerCase())o=e;else if("object"===e.tagName.toLowerCase())o=e.contentDocument.documentElement;else{if("embed"!==e.tagName.toLowerCase())throw"img"===e.tagName.toLowerCase()?new Error('Cannot script an SVG in an "img" element. Please use an "object" element or an in-line SVG.'):new Error("Cannot get SVG.");o=e.getSVGDocument().documentElement;}return o},proxy:function(t,e){return function(){return t.apply(e,arguments)}},getType:function(t){return Object.prototype.toString.apply(t).replace(/^\[object\s/,"").replace(/\]$/,"")},mouseAndTouchNormalize:function(t,e){if(void 0===t.clientX||null===t.clientX)if(t.clientX=0,t.clientY=0,void 0!==t.touches&&t.touches.length){if(void 0!==t.touches[0].clientX)t.clientX=t.touches[0].clientX,t.clientY=t.touches[0].clientY;else if(void 0!==t.touches[0].pageX){var o=e.getBoundingClientRect();t.clientX=t.touches[0].pageX-o.left,t.clientY=t.touches[0].pageY-o.top;}}else void 0!==t.originalEvent&&void 0!==t.originalEvent.clientX&&(t.clientX=t.originalEvent.clientX,t.clientY=t.originalEvent.clientY);},isDblClick:function(t,e){if(2===t.detail)return !0;if(void 0!==e&&null!==e){var o=t.timeStamp-e.timeStamp,n=Math.sqrt(Math.pow(t.clientX-e.clientX,2)+Math.pow(t.clientY-e.clientY,2));return o<250&&n<10}return !1},now:Date.now||function(){return (new Date).getTime()},throttle:function(t,e,o){var n,i,s,r=this,a=null,l=0;o||(o={});var u=function(){l=o.leading===!1?0:r.now(),a=null,s=t.apply(n,i),a||(n=i=null);};return function(){var h=r.now();l||o.leading!==!1||(l=h);var c=e-(h-l);return n=this,i=arguments,c<=0||c>e?(clearTimeout(a),a=null,l=h,s=t.apply(n,i),a||(n=i=null)):a||o.trailing===!1||(a=setTimeout(u,c)),s}},createRequestAnimationFrame:function(t){var e=null;return "auto"!==t&&t<60&&t>1&&(e=Math.floor(1e3/t)),null===e?window.requestAnimationFrame||n(33):n(e)}};},{}]},{},[1]);

    class ToolTip {
        constructor(type){
            this.type = type;
            this.init();
        }
        init(){
            this.elem = document.createElement('div');
            this.arrow = document.createElement('div');
            this.content = document.createElement('div');

            setElemStyle(this.arrow, {
                position: 'absolute',
                width: '0px',
                height: '0px',
                borderWidth: '3px',
                borderColor: 'transparent',
                borderStyle: 'solid',
                borderBottomWidth: '0px',
                borderTopColor: '#3d3d3d',
                bottom: '-3px',
                left: '-3px'
            });

            setElemStyle(this.content, {
                backgroundColor: '#3d3d3d',
                color: '#fff',
                height: '24px',
                whiteSpace: 'nowrap',
                lineHeight: '24px',
                transform: 'translateX(-50%)',
                padding: '0 10px',
                borderRadius: '4px'
            });

            this.elem.appendChild(this.arrow);
            this.elem.appendChild(this.content);
        }
        show({ left, top, text, dx }){
            dx = dx || 0;
            const { type } = this;

            let transform = type === 'node'? `translate(${dx}px, -100%)`:'translateY(-100%)';
            setElemStyle(this.elem, {
                position: 'fixed',
                zIndex: 1500,
                left: left + 'px',
                top: (top - 8) + 'px',
                transform
            });

            this.content.innerHTML = text;

            document.body.appendChild(this.elem);
        }
        hide(){
            document.body.removeChild(this.elem);
        }
    }

    const Icons = {
        zoomIn: `<svg t="1546354735657" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3865" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20">
    <defs><style type="text/css"></style></defs>
    <path d="M919.264 905.984l-138.912-138.912C851.808 692.32 896 591.328 896 480c0-229.376-186.624-416-416-416S64 250.624 64 480s186.624 416 416 416c95.008 0 182.432-32.384 252.544-86.208l141.44 141.44a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0.032-45.248zM128 480C128 285.92 285.92 128 480 128s352 157.92 352 352-157.92 352-352 352S128 674.08 128 480z" p-id="3866"></path><path d="M625.792 448H512v-112a32 32 0 0 0-64 0V448h-112a32 32 0 0 0 0 64H448v112a32 32 0 1 0 64 0V512h113.792a32 32 0 1 0 0-64z" p-id="3867"></path>
    </svg>`,
        zoomOut: `<svg t="1546355535455" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4099" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20">
    <defs><style type="text/css"></style></defs
    ><path d="M480 896C250.624 896 64 709.376 64 480S250.624 64 480 64s416 186.624 416 416-186.624 416-416 416z m0-768C285.92 128 128 285.92 128 480s157.92 352 352 352 352-157.92 352-352S674.08 128 480 128z" p-id="4100"></path><path d="M640 520H320a32 32 0 0 1 0-64h320a32 32 0 1 1 0 64zM896.64 960.64a31.904 31.904 0 0 1-22.624-9.376l-160.64-160.64a31.968 31.968 0 1 1 45.248-45.248l160.64 160.64a31.968 31.968 0 0 1-22.624 54.624z" p-id="4101"></path>
    </svg>`,
        resetZoom: `<svg t="1546355720537" class="icon" style="" viewBox="0 0 1228 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1280" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20">
    <defs><style type="text/css"></style></defs>
    <path d="M843.1616 68.266667H989.866667a170.666667 170.666667 0 0 1 170.666666 170.666666v152.8832a34.133333 34.133333 0 1 0 68.266667 0V238.933333a238.933333 238.933333 0 0 0-238.933333-238.933333h-146.705067a34.133333 34.133333 0 0 0 0 68.266667zM1160.533333 629.3504V785.066667a170.666667 170.666667 0 0 1-170.666666 170.666666h-123.5968a34.133333 34.133333 0 0 0 0 68.266667H989.866667a238.933333 238.933333 0 0 0 238.933333-238.933333v-155.716267a34.133333 34.133333 0 1 0-68.266667 0zM393.4208 955.733333H238.933333a170.666667 170.666667 0 0 1-170.666666-170.666666v-155.136a34.133333 34.133333 0 0 0-68.266667 0V785.066667a238.933333 238.933333 0 0 0 238.933333 238.933333h154.487467a34.133333 34.133333 0 0 0 0-68.266667zM68.266667 393.045333V238.933333a170.666667 170.666667 0 0 1 170.666666-170.666666h147.933867a34.133333 34.133333 0 0 0 0-68.266667H238.933333a238.933333 238.933333 0 0 0-238.933333 238.933333v154.112a34.133333 34.133333 0 1 0 68.266667 0z" p-id="1281"></path>
    </svg>`
    };

    class ToolBox {
        constructor(options){
            this.panZoomTiger = options.panZoomTiger;
            this.toolBoxConfig = options.toolBox;
            this.container = options.container;
        }
        destroy(){
            this.container.removeChild(this.toolBox);
        }
        create(svgStr){
            const svg = document.querySelector(svgStr);
            const toolBox = document.createElement('ul');
            const zoomInBtn = document.createElement('li');
            const zoomOutBtn = document.createElement('li');
            const resetBtn = document.createElement('li');

            let { toolBoxConfig } = this;
            let zIndex = '1500';
            if(typeof toolBoxConfig === 'object'){
                zIndex = toolBoxConfig.zIndex || zIndex;
            }

            let svgClientRect = svg.getBoundingClientRect();
            Object.assign(toolBox.style, {
                position: 'fixed',
                left: svgClientRect.left + 'px',
                top: svgClientRect.bottom + 'px',
                fontSize: '12px',
                margin: '0',
                transform: 'translateY(-100%)',
                padding: '10px',
                zIndex
            });

            this.build(zoomInBtn, 'zoomIn');
            this.build(zoomOutBtn, 'zoomOut');
            this.build(resetBtn, 'resetZoom');

            toolBox.appendChild(zoomInBtn);
            toolBox.appendChild(zoomOutBtn);
            toolBox.appendChild(resetBtn);

            this.toolBox = toolBox;
            this.zoomInBtn = zoomInBtn;
            this.zoomOutBtn = zoomOutBtn;
            this.resetBtn = resetBtn;

            this.container.appendChild(toolBox);
        }
        build(li, type){
            let icon = document.createElement('span');

            icon.innerHTML = Icons[type];

            Object.assign(icon.style, {
                display: 'flex',
                alignItems: 'center'
            });

            const tooltip = new ToolTip('node');
            let text = '';
            switch(type){
            case 'zoomIn': 
                text = '放大';
                break;
            case 'zoomOut':
                text = '缩小';
                break;
            case 'resetZoom':
                text = '原始大小';
                break;
            default:
                text = '放大';
            }

            Object.assign(li.style, {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '32px',
                position: 'relative',
                zIndex: '10',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                textAlign: 'center',
                color: '#fff',
                border: '1px solid #dedede',
                background: '#fff',
                marginBottom: '4px'
            });

            li.addEventListener('click', () => {
                this.panZoomTiger[type]();
            });

            li.addEventListener('mouseenter', () => {
                let clientRect = li.getBoundingClientRect();
                
                tooltip.show({ 
                    left: clientRect.left,
                    top: clientRect.top,
                    text,
                    dx: 15
                });
            });

            li.addEventListener('mouseleave', () => {
                tooltip.hide();
            });

            li.appendChild(icon);
        }
    }

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

            let symbols$$1 = this.createSymbols();
            symbols$$1.forEach(symbol => {
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
            return symbols.map(value => value.create());
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

            return svgPanZoom('#viewport', svgPanZoomConfig);
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

    class GraphRenderer {
        constructor(initOptions = {}){
            this.initOptions = this.mergeInitOptions(initOptions);
        }
        mergeInitOptions(initOptions){
            let defaultOptions = {
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
                svgPanZoomConfig: {},
                toolBox: true
            };
            let res = {
                svgPanZoomConfig: mergeObject(defaultOptions.svgPanZoomConfig, initOptions.svgPanZoomConfig, true)
            };
            
            return Object.assign(defaultOptions, initOptions, res);
        }
        mergeRenderOptions(renderOptions){
            let { nodes, links } = renderOptions;
            let defaultOptions = {
                linkConfig: {
                    linkType: 'curve'
                },
                rowConfig: {
                    gap: 100,
                    height: 35
                },
                columnConfig: {
                    gap: 20
                },
                node: {
                    icon: {
                        id: 'spark_icon'
                    },
                    formatter(node){
                        return textEllipsis(node.name, 20);
                    }
                }
            };

            return this.renderOptions = {
                linkConfig: mergeObject(defaultOptions.linkConfig, renderOptions.linkConfig, true),
                rowConfig: mergeObject(defaultOptions.rowConfig, renderOptions.rowConfig, true),
                columnConfig: mergeObject(defaultOptions.columnConfig, renderOptions.columnConfig, true),
                nodes, links,
                node: mergeObject(defaultOptions.node, renderOptions.node, true)
            };
        }
        render(renderOptions = {}){
            const { nodes, links } = this.mergeRenderOptions(renderOptions);

            if(!nodes.length || !links.length){
                return;
            }
            
            this.reset();
            this.build(this.renderOptions);
        }
        reset(){
            GraphNode.nodeMap = {};
            Layout.layoutNodeMap = {};
        }
        destroy(){
            this.Layout.destroy();
        }
        build(renderOptions){
            const { 
                nodes, links, linkConfig, rowConfig, columnConfig,
                node
            } = renderOptions;

            let GraphLinks = links.reduce((prev, cur) => {
                let { exist, link } = GraphLinkCreator.create(cur, {nodes, linkConfig});

                if(!exist){
                    prev.push(link);
                }
                return prev;
            }, []);

            /**find roots */
            let nodeMap = {};
            let rootNodes = GraphLinks.filter(link => {
                let {sourceNode} = link;
                let inCount = sourceNode.getInCount();
                if(inCount === 0 && !nodeMap[sourceNode.id]){
                    nodeMap[sourceNode.id] = sourceNode;
                    return true;
                }
            }).map(link => link.sourceNode);

            /**layout */
            let layout = this.layout(rootNodes);

            layout.build({rowConfig, columnConfig, node});
            layout.render();
        }
        layout(rootNodes){
            /**create tree matrix */
            let matrix = [rootNodes];
            let layoutNodeMap = {};
            let { row, pushToNextRow } = this.getRowFromParent({parentNodes: rootNodes, layoutNodeMap});

            while(row.length){
                matrix.push(row);
                let rowRes = this.getRowFromParent({parentNodes: row, layoutNodeMap, readyForPush: pushToNextRow});
                row = rowRes.row;
                pushToNextRow = rowRes.pushToNextRow;
            }

            /**create layout with matrix */
            let layout = new Layout({matrix, initOptions: this.initOptions});

            this.Layout = layout;

            return layout;
        }
        getRowFromParent({ parentNodes, layoutNodeMap, readyForPush}){
            let map = {};
            let row = [];
            let targetMap = {}; //aviod same row node link
           
            for(let i = 0; i < parentNodes.length; i++){
                let parentNode = parentNodes[i];
                let targetNodes = parentNode.getTargetNodes();
                
                if(i === parentNodes.length -1){
                    targetNodes = targetNodes.concat(readyForPush || []);
                }
                targetNodes.forEach(node => {
                    if(!map[node.id] && !layoutNodeMap[node.id]){
                        /**aviod same row node link */
                        targetMap[node.id] = [];
                        node.links.source.forEach(link => {
                            targetMap[node.id].push(link.targetNode.id);
                        });

                        map[node.id] = node;
                        layoutNodeMap[node.id] = node;
                        row.push(node);
                    }
                });
            }
            
            let pushToNextRow = [];
            for(let i = row.length - 1; i >= 0; i--){
                let node = row[i];
                let targetIds = targetMap[node.id];
                let readyForRemove = [];

                row.every((node, index) => {
                    let has = targetIds.includes(node.id);
                    if(has){
                        pushToNextRow.push(node);
                        readyForRemove.push(index);
                    }
                    return has;
                });

                readyForRemove.forEach(index => {
                    delete layoutNodeMap[row[index].id];
                    row.splice(index, 1);
                });
            }
            
            return { row, pushToNextRow };
        }
    }

    var Graph = {
        init(initOptions){
            return new GraphRenderer(initOptions);
        }
    };

    window.Graph = Graph;

    return Graph;

}));
