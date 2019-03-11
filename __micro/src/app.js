/**
 * Application Start
 */
let config = require('./config')
let encrypt = require('./libs/encrypt')
let micro = require('./libs/micro')

let express = require('express')
let app = express()

// Express Log
let morgan = require('morgan')
app.use(morgan('short'))

// 去除Express Header
app.disable('x-powered-by')

// 静态文件目录
app.use(express.static('./public'))

// Body数据解析
let bodyParser = require('body-parser')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) { 
    res.end(req.path)
})

app.get('/gateway.do', function (req, res) { 
    console.log()
    res.end('<title></title><meta charset="UTF-8"></meta><body>不支持GET请求</body>')
})

// application/x-www-form-urlencoded
app.post('/gateway.do', function (req, res) {
    if(req.get('Content-Type')!='application/x-www-form-urlencoded'){
        res.send(500, '<title></title><meta charset="UTF-8"></meta><body>请设置请求Content-Type值为:application/x-www-form-urlencoded</body>')
        res.end()
        return
    }
    //let appid = req.query.appid
    console.log(JSON.stringify(req.body))
    let biz = req.body.biz
    biz = encrypt.decode(biz, '')
    let rs = micro.call(JSON.parse(biz))
    rs = encrypt.encode(JSON.stringify(rs), '')
    
    res.set('Content-Type', 'text/plain')
    res.end(rs)
})

app.listen(config.server.port, function () {
    console.log(`Start Server http://localhost:${config.server.port}/`)
})