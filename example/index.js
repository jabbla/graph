var Graph = window.Graph;

var renderer = Graph.init({
    el: '#container'
});

renderer.render({
    nodes: [
        {
            id: 'a',
            name: 'a'
        },
        {
            id: 'a1',
            name: 'a1'
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
    ],
    links: [
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
    ]
});
