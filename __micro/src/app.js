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


app.post('/gateway.do',function(req,res){
    let appid = req.query.appid
    let biz = req.query.biz
    
    let method = biz.method

     let rs = require('./config').service(biz)

    res.end('gateway..........')
})

app.post('umq.user.add',function(req,res){
    
})

let server = app.listen(ctx.config().server.port, function () {
    console.log(`Start Server http://localhost:${server.address().port}/`)
})
