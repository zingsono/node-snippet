/**
 * 服务器时间
 */
module.exports = function () {
    let date = new Date()
    return {'date':date, 'timestamp':parseInt(date.getTime()/1000), 'milliseconds':date.getTime()}
}
