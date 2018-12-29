var express = require('express')
var app = express()

app.get('/', function (req, res) {
    let i = req.query.tmp
    let tmp = require('./tmp0'+i)
    console.log(tmp.tmp)
    res.send(tmp.tmp)
})


app.get('/zing/gateway.do', function (req, res) {
    //解析POST参数，获取交易码
    let tid = 'T1000001'

    let z = {}
    z.req = req
    z.res = res
    z.db = ''
    z.args = ''
    z.http = '';z

    //动态require交易码对应js模块
    require(`./runtime/${tid}`)(z).then((body)=>{
        console.log(body)
    })
    //返回结果

})

app.listen(30625)
