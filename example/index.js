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
            id: 'b',
            name: 'b'
        }
    ],
    links: [
        {
            source: 'a',
            target: 'b'
        }
    ]
});
