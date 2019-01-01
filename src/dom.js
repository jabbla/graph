export function createSvgElement(tagname){
    let elem = document.createElementNS('http://www.w3.org/2000/svg', tagname);
    if(tagname === 'svg'){
        setAttributes(elem, {
            xmlns: 'http://www.w3.org/2000/svg',
            version: '1.1'
        });
    }
    return elem;
}

export function setSvgAttribute(elem, attr, value){
    elem.setAttributeNS('http://www.w3.org/2000/svg', attr, value);
}

export function setSvgAttributes(elem, option){
    for(let attr in option){
        let value = option[attr];

        setSvgAttribute(elem, attr, value);
    }
}

export function setAttributes(elem, option){
    for(let attr in option){
        let value = option[attr];

        elem.setAttribute(attr, value);
    }
}

export function setElemStyle(elem, options){
    Object.assign(elem.style, options);
}