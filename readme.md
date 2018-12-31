## Graph

## Basic Usage

## init
```js
var renderer = Graph.init(options)
```
### options.el
> root element of graph

```js
var options = {el: '#container'};
```

### options.width options.height
> specify svg width and height

```js
var options = {el: '#container', width: 200, height: 200};
//output: <svg width="200" height="200"></svg>
```

### options.backgroundColor
> backgroundColor of svg element

```js
var options = {
    backgroundColor: '#F6F9FB'
}
```

### options.svgPanZoomConfig
> use library svg-pan-zoom.js, you can customize behaviors on you own

default configurations below, or you can cover it.

```js
var options = {
    svgPanZoomConfig: {
        controlIconsEnabled: true //default true
    }
};
```

click [ariutta/svg-pan-zoom](https://github.com/ariutta/svg-pan-zoom) for more infomation


## render
> render svg with renderOptions

```js
renderer.render(renderOptions)
```

### renderOptions.nodes
> graph nodes of current render-frame

```js
{
    nodes: [
        {
            id: 'a',
            name: 'a'
        },
        {
            id: 'b',
            name: 'b'
        }
    ]
}
```
**node.id**：id for single node，this field must be unique.

**node.name**：name for single node.

**node.classList**：classList for single node，default 'node' class will be applied on node.

### renderOptions.links
> graph links for current-frame

```js
{
    links: [
        {
            source: 'a',
            target: 'b'
        }
    ]
}
```
**link.source**：source-node（node.id）

**link.target**：target-node（node.id）

### renderOptions.linkConfig
> global link config

line or curve

```js
{
    linkConfig: {
        lineType: 'curve' //curve（default），line
    }
}
```

### renderOptions.rowConfig
> row config

you can specify row gap、height

```js
{
    rowConfig: {
        gap: 100, //default 100
        height: 35 //default 
    }
}
```

### renderOptions.columnConfig
> column config

specify column gap

```js
{
    columnConfig: {
        gap: 20
    }
}
```

### renderOptions.node
> global node config

single node config will cover renderOptions.node

**node.formatter**
default formatter will return node.name

```js
{
    node: {
        formatter(node){
            return node.name; //default
        }
    }
}
```