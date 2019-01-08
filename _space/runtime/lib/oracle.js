/**
 * Oracle数据库操作, 需要依赖Oracle client
 * oracledb 模块使用说明文档：https://oracle.github.io/node-oracledb/doc/api.html#getstarted
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
    let connection
    let orcl = {
        // 是否开启事务，默认不开启
        transaction: false,
        //获取连接
        conn() {
            if (this.transaction) {
                if (connection) {
                    connection = oracledb.getConnection(conf)
                }
                return connection
            }
            return oracledb.getConnection(conf)
        },
        //执行更新操作
        update(sql, args) {
            return this.conn().then(function (conn) {
                return conn.execute(sql, args, {
                    autoCommit: true
                })
            })
        },
        //执行查询SQL, options参数文档：https://oracle.github.io/node-oracledb/doc/api.html#executeoptions
        select(sql, args, options = {
            resultSet: true
        }) {
            return this.conn().then(function (conn) {
                return conn
                    .execute(sql, args, options)
                    .then(function (result) {
                        conn.close()
                        return result
                    })
            })
        },
        //快捷方法：插入对象
        insertObject(tableName, obj) {

        },
        //快捷方法：查询全部数据
        selectAll(tableName) {

        },
        //快捷方法：分页查询 
        selectPage(sql, args, options = {}) {

        }

    }
    return orcl
}