# Space

交易驱动开发，一切功能皆是交易。

```
目录结构：
space
 - public          静态文件目录
 - runtime         运行时文件
 - app.js          启动文件
 - package.json    项目依赖
 - README.md       项目说明
```

## 1. 接收HTTP请求

```js
/**
* HTTP请求处理模块
* 模块命名： http_
*/
module.exports = {
    // 参数对应Express的req与res
    apply(req, res) {
        return { }
    },
    other(){
        
    }
}
```

## 2. 工具类模块

```js
module.exports = {
    apply() {
        return { }
    },
    other(){
        
    }
}
```
     
## 3. 业务交易模块

```js
// 根据http模块调用规则定义
// 如应用接口网关，定义接口参数规则，响应规则
module.exports = {
    apply() {
        return { }
    },
    other(){
        
    }
}
```
     
