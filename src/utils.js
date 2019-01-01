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

export function mergeObject(source1, source2, deep){
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
