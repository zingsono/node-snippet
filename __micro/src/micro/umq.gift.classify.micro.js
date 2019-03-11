/**
 * 礼品分类模块
 */

let classify = require('../model/gift_classify.model')

module.exports = function(){
    return {
        'umq.gift.classify.add': async function(biz) {
            console.log(biz)
            let rs = await classify.create(biz.body)
            return rs
        },
        'umq.gift.classify.edit': async function(biz) {
            console.log(biz)
            let rs = await classify.updateMany({classify_no:biz.body.classify_no}, {classify_name:biz.body.classify_name})
            return rs
        },
        'umq.gift.classify.del': async function(biz) {
            console.log(biz)
            let rs = await classify.deleteMany({classify_no:biz.body.classify_no})
            return rs
        },
        'umq.gift.classify.list': async function(biz) {
            console.log(biz)
            let rs = await classify.find({})

            global.redis.set('foo', JSON.stringify(rs))
            global.log.debug('debug log')

            return rs
        },
        'umq.gift.classify.error': async function(biz) {
            console.log(biz)
            //抛出自定义错误信息
            throw {code:'10001', msg:'自定义错误信息'}
        },
    }
}