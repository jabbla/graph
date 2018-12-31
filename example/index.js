var Graph = window.Graph;

var renderer = Graph.init({
    el: '#container'
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
    }
];
var links2 = [
    {
        source: 'd',
        target: 'a1'
    },
    {
        source: 'a2',
        target: 'd'
    },
    {
        source: 'a',
        target: 'b'
    }
];

var links1 = [
    {
        source: 'a1',
        target: 'd'
    },
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
    }
];

renderer.render({
    linkConfig: {
        linkType: 'line'
    },
    node: {
        icon: {
            id: 'sql_icon',
            //color: '#dc254c'
        }
    },
    nodes,
    links: links1
});
document.querySelector('#button').onclick = function(){
    renderer.render({
        linkConfig: {
            linkType: 'curve'
        },
        nodes,
        links: links2
    });
};

