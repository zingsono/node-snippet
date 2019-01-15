/**
 * 服务器时间
 * 
 * 中文网：http://momentjs.cn/  
 */

let moment = require('moment')


module.exports = function () {
    let date = new Date()
    return {
        date: date,
        format: moment.format(),
        timestamp: parseInt(date.getTime() / 1000),
        milliseconds: date.getTime()
    }
}