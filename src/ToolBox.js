import ToolTip from './ToolTip';

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
    constructor(panZoomTiger){
        this.panZoomTiger = panZoomTiger;
        this.createCSSText();
    }
    createCSSText(){
        const style = document.createElement('style');

        style.innerHTML = `
            .graph_toolbox {
                font-size: 12px;
                margin: 0;
                transform: translateY(-100%);
                padding: 10px;
            }
            .graph_toolbox .tooltip {
                display: flex;
                width: 100%;
                align-item: center;
                justify-content: center;
            }
            .graph_toolbox .btn {
                display: flex;
                align-items: center;
                line-height: 32px;
                position: relative;
                z-index: 10;
                width: 32px;
                height: 32px;
                cursor: pointer;
                text-align: center;
                color: #fff;
                border: 1px solid #dedede;
                background: #fff;
                margin-bottom: 4px;
            }
        `;

        document.head.appendChild(style);
    }
    create(svgStr){
        const svg = document.querySelector(svgStr);
        const toolBox = document.createElement('ul');
        const zoomInBtn = document.createElement('li');
        const zoomOutBtn = document.createElement('li');
        const resetBtn = document.createElement('li');

        let clientRect = svg.getBoundingClientRect();
        Object.assign(toolBox.style, {
            position: 'fixed',
            left: clientRect.left + 'px',
            top: clientRect.bottom + 'px',
            transform: 'translateY()'
        });

        this.build(zoomInBtn, 'zoomIn');
        this.build(zoomOutBtn, 'zoomOut');
        this.build(resetBtn, 'resetZoom');

        toolBox.className = 'graph_toolbox';
        zoomInBtn.className = 'btn graph_zoomInBtn';
        zoomOutBtn.className = 'btn graph_zoomOutBtn';
        resetBtn.className = 'btn graph_resetBtn';

        toolBox.appendChild(zoomInBtn);
        toolBox.appendChild(zoomOutBtn);
        toolBox.appendChild(resetBtn);

        this.toolBox = toolBox;
        this.zoomInBtn = zoomInBtn;
        this.zoomOutBtn = zoomOutBtn;
        this.resetBtn = resetBtn;

        return toolBox;
    }
    build(li, type){
        let icon = document.createElement('span');

        icon.innerHTML = Icons[type];
        icon.className = 'tooltip';

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

export default ToolBox;