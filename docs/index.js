var Graph = window.Graph;

var renderer = Graph.init({
    el: '#container',
    backgroundColor: '#F6F9FB'
});

var nodes = [
    {
        id: 'a',
        name: 'integ_browse_app_midtable_dt_start'
    },
    {
        id: 'a1',
        name: 'a1',
    },
    {
        id: 'a2',
        name: 'a2'
    },
    {
        id: 'b',
        name: 'b'
    },
    {
        id: 'c',
        name: 'c'
    },
    {
        id: 'd',
        name: 'd'
    },
    {
        id: 'e',
        name: 'e'
    },
    {
        id: 'f',
        name: 'f'
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
        icon: {}
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