let express = require('express')
let app = express()
// 去除Express Header
app.disable('x-powered-by')

// 静态文件目录
app.use(express.static('public'))

// 参数body数据解析
let bodyParser = require('body-parser')
app.use(bodyParser.json())  // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 构建统一上下文对象
let ctx = {
    require(rt, req, res){
        rt = './runtime/'+rt
        delete require.cache[require.resolve(rt)]  // 开发环境缓存
        return require(rt)(ctx, req, res)
    },
    config(){
        return ctx.require('config')
    }
}

app.all('/:rt', function (req, res) {
    let rs = ctx.require(req.params.rt, req, res)
    res.send(rs)
})
app.listen(30625)
console.log('Server http://localhost:30625/')
