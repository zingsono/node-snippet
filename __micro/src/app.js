/**
 * Application Start
 */
let config = require('./config')
let datagram = require('./libs/datagram')

// Redis
require('./libs/rediscli')
// MongoDB
require('./libs/mongoose')
// Log4js
require('./libs/log4js')

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
    res.set('Content-Type', 'text/plain')
    datagram(req.body.biz).then(function(ciphertext){
        res.end(ciphertext)
    }).catch((error)=>{
        global.log.error(error)
        res.end()
    })
})

app.listen(config.server.port, function () {
    global.log.debug(`Start Server http://localhost:${config.server.port}/`)
})