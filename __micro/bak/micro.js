/**
 * @deprecated
 */

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

module.exports = function(biz){
    let o = apis[biz.method] 
    return o.service(biz)
}