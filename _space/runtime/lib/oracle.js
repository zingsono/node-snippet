/**
 * Oracle数据库操作, 需要依赖Oracle client
 */

let oracledb = require('oracledb')
// 不设置自动提交，默认true
oracledb.autoCommit = false
// 查询超时时间设置 10 seconds, 默认60 seconds
oracledb.queueTimeout = 10000
console.log('Oracle client library version is ' + oracledb.oracleClientVersionString)

module.exports = function (ctx) {
    //数据库连接配置
    let conf = ctx.config().oracle
    return {
        conn(){
            return oracledb.getConnection(conf)
        },
        async execute(){
            let conn = await oracledb.getConnection(conf)

            return ''
        }
    }
}
