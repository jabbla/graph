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
            name: 'a',
            classList: ['class1']
        },
        {
            id: 'b',
            name: 'b',
            classList: ['class2']
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

