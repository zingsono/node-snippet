let config = require('../config')

function initMicro(){
    let requireAll = require('require-all')({
        dirname: __dirname+'/../micro',
    })
    let apis = {}
    for (const key in requireAll) {
        if (!requireAll.hasOwnProperty(key)) {
            continue
        }
        let mobj = requireAll[key]()
        for (const k in mobj) {
            apis[k] = {require:key, service:mobj[k]}
        }
    }
    return apis
}

let micro = {
    apis:initMicro(),
    call(biz){
        let o = micro.apis[biz.method]
        //开发模式，每次重新加载文件
        if(config.devmode){
            micro.apis = initMicro()
            o = micro.apis[biz.method]
            let _m = '../micro/'+o.require
            delete require.cache[require.resolve(_m)] 
            o.service = require(_m)()[biz.method]
        }   
        return o.service(biz)
    },
}
module.exports = micro