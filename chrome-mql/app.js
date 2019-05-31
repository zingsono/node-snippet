let conf = require('./config')
let uuid = ()=>(require('uuid/v1')().split('-').join(''))
let mongo = require('node-mongo-mql').now(conf.mongo.uris, conf.mongo.options)

let router = require('koa-router')()
router.post('/mql', async ctx=>{
    let requestId = ctx.request.body.requestId||uuid()
    try {
        let mql = ctx.request.body.mql
        if(!mql){
            throw new Error('Parameter "mql" cannot be null')
        }
        console.log(`*>'${requestId}'ReqMql=${mql}`)
        mql = JSON.parse(mql)
        let rs = await mongo.exec(mql)
        ctx.body = {code:'0', msg:'ok', body:rs||{}}
    } catch (e) {
        if(e.code){
            ctx.body = {code:String(e.code), msg:e.message, body:{}}
        }else{
            console.error(e)
            ctx.body = {code:'99999', msg:e.message, body:{}}
        }
    }
    console.log(`*>'${requestId}'ResMql=${JSON.stringify(ctx.body)}`)
})

let Koa = require('koa')
let app = new Koa()
app.use(require('@koa/cors')())
app.use(require('koa-static')('public',{}))
app.use(require('koa-bodyparser')())
app.use(router.routes())
app.listen(conf.server.port)
console.log(`Koa server start listen: http://127.0.0.1:${conf.server.port}`)