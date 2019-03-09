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

let multer = require('multer ')  //用于处理 enctype=”multipart/form-data”（设置表单的MIME编码）的表单数据
app.use(multer({dest:'/tmp/'}).array('image'))

// 构建统一上下文对象
let ctx = {
    require(rt, req, res) {
        delete require.cache[require.resolve(rt)] // 文件更新时需要清除缓存或者重启服务
        return require(rt)(ctx, req, res)
    },
    servlet(rt,req,res){
        rt = './servlet/' + rt
        return ctx.require(rt, req, res)
    },
    route(rt, req, res){
        rt = './route/' + rt
        return ctx.require(rt, req, res)
    },
    config() {
        return ctx.require('config')
    }
}

app.all('/*', function (req, res) {
    ctx.servlet(req.path, req, res)
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
