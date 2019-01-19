/**
 * Application Start
 */
let express = require('express')
let app = express()

// 去除Express Header
app.disable('x-powered-by')

// 静态文件目录
app.use(express.static('public'))

// Body数据解析
let bodyParser = require('body-parser')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded

// 构建统一上下文对象
let ctx = {
    require(rt, req, res) {
        rt = './runtime/' + rt
        delete require.cache[require.resolve(rt)] // 文件更新时需要清除缓存或者重启服务
        return require(rt)(ctx, req, res)
    },
    route(rt, req, res){
        rt = 'route' + rt
        return ctx.require(rt, req, res)
    },
    config() {
        return ctx.require('config')
    }
}

app.all('/:module/:action', function (req, res) {
    ctx.require(req.params.module + '/' + req.params.action, req, res)
        .then(rs => {
            res.send(rs)
        }).catch(err => {
            console.log(err)
            res.send(err)
        })
})

let server = app.listen(ctx.config().server.port, function () {
    console.log(`Start Server http://localhost:${server.address().port}/`)
})
