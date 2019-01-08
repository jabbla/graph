var Graph = window.Graph;

var renderer = Graph.init({
    el: '#container',
    backgroundColor: '#F6F9FB'
});

var nodes = [
    {
        id: 'a',
        name: 'integ_browse_app_midtable_dt_start',
        column: 'ssss'
    },
    {
        id: 'a1',
        name: 'a1',
        column: 'ssss'
    },
    {
        id: 'a2',
        name: 'a2',
        column: 'ssss'
    },
    {
        id: 'b',
        name: 'b',
        column: 'ssss'
    },
    {
        id: 'c',
        name: 'c',
        column: 'ssss'
    },
    {
        id: 'd',
        name: 'd',
        column: 'ssss'
    },
    {
        id: 'e',
        name: 'e',
        column: 'ssss'
    },
    {
        id: 'f',
        name: 'f',
        column: 'ssss'
    }
];

var links = [
    {
        source: 'a2',
        target: 'd'
    },
    {
        source: 'a',
        target: 'b'
    },
    {
        source: 'c',
        target: 'b'
    },
    {
        source: 'b',
        target: 'd'
    },
    {
        source: 'a',
        target: 'd'
    },
    {
        source: 'd',
        target: 'e'
    },
    {
        source: 'e',
        target: 'a1'
    },
    {
        source: 'a1',
        target: 'e'
    },
    {
        source: 'd',
        target: 'b'
    },
    {
        source: 'b',
        target: 'e'
    },
    {
        source: 'a2',
        target: 'c'
    },
    {
        source: 'c',
        target: 'a2'
    },
    {
        source: 'f',
        target: ''
    }
];

var renderOptions =  {
    nodes,
    links,
    linkConfig: {},
    node: {
        icon: {},
        tooltip: {
            formatter(node){
                return `<p>${node.name}</p><p>${node.column}</p>`;
            }
        }
    },
    rowConfig: {},
    columnConfig: []
};


renderer.render(renderOptions);

document.querySelector('#button_curve').onclick = function(){
    renderOptions.linkConfig.linkType = 'curve';
    renderer.render(renderOptions);
};

document.querySelector('#button_line').onclick = function(){
    renderOptions.linkConfig.linkType = 'line';
    renderer.render(renderOptions);
};

document.querySelector('#button_sql_icon').onclick = function(){
    renderOptions.node.icon = {
        id: 'sql_icon'
    };
    renderer.render(renderOptions);
};

document.querySelector('#button_spark_icon').onclick = function(){
    renderOptions.node.icon = {
        id: 'spark_icon'
    };
    renderer.render(renderOptions);
};

document.querySelector('#button_icon_color').onclick = function(){
    renderOptions.node.icon.color = document.querySelector('#icon_color').value;
    renderer.render(renderOptions);
};

document.querySelector('#button_row_gap').onclick = function(){
    renderOptions.rowConfig.gap = +document.querySelector('#row_gap').value;
    renderer.render(renderOptions);
};

document.querySelector('#button_column_gap').onclick = function(){
    renderOptions.columnConfig.gap = +document.querySelector('#column_gap').value;
    renderer.render(renderOptions);
};