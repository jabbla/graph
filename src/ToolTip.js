import { setElemStyle } from "./dom";

class ToolTip {
    constructor(){
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
            lineHeight: '24px',
            transform: 'translateX(-50%)',
            padding: '0 10px',
            borderRadius: '4px'
        });

        this.elem.appendChild(this.arrow);
        this.elem.appendChild(this.content);
    }
    show({ left, top, text }){
        setElemStyle(this.elem, {
            position: 'fixed',
            zIndex: 1500,
            left: left + 'px',
            top: (top - 8) + 'px',
            transform: 'translate(100%, -100%)'
        });

        this.content.innerHTML = text;

        document.body.appendChild(this.elem);
    }
    hide(){
        document.body.removeChild(this.elem);
    }
};

export default ToolTip;