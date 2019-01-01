export function getTextLength(text, lengthLimit){
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

export function textEllipsis(text, length){
    let { length: textLength, index } = getTextLength(text, length);
    if(textLength > length){
        return text.slice(0, (index - 2)) + '...';
    }
    return text;
}

export function mergeObject(source1, source2){
    return Object.assign({}, source1, source2);
}
