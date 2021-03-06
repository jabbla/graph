# 数据治理 层级图API设计

## 节点声明
## 单一节点角度
一些基本信息
```js
{
    nodes: [
        {
            id: 1,    //节点的唯一标识，不可重复
            name: '节点1'
        }
    ]
}
```

### 格式化内容
优先应用节点自身的``formatter``，其次全局``formatter``
```js
{
    //全局格式化
    formatter(name){
        return name + '节点';
    },
    nodes: [
        {
            id: 1,    //节点的唯一标识，不可重复
            name: '节点1',
            formatter(name){

            }
        }
    ]
}
```

## 节点分类角度
1. 分类自身信息 2. 节点相关于分类的信息 3. 内置分类

### 分类自身信息
分类自身信息
```js
{
    classList: [
        {
            class: 'node',  //分类名
            styler(node){
            },  //分类的标准样式处理函数
            action(node){
            }   //该分类节点的动作处理函数
        }
    ]
}
```

### 节点相关于分类的信息
节点相关于分类的信息
```js
{
    nodes: [
        {
            id: 1,
            name: '节点1',
            classList: ['node'] //分类列表，按照顺序依次应用
        }
    ]
}
```

## 关系声明
声明两个节点之间的关系，有节点``a``和节点``b``，``a``指向``b``则有下面配置
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
    ],
    links: [
        {
            source: 'a',
            target: 'b'
        }
    ]
}
```