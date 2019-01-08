/**
 * Oracle数据库操作, 需要依赖Oracle client
 * oracledb 模块使用说明文档：https://oracle.github.io/node-oracledb/doc/api.html#getstarted
 */

let oracledb = require('oracledb')
// 不设置自动提交，默认true
oracledb.autoCommit = false
// 查询超时时间设置 10 seconds, 默认60 seconds
oracledb.queueTimeout = 10000
console.log('** Oracle client library version is ' + oracledb.oracleClientVersionString)

module.exports = function (ctx) {
    //数据库连接配置
    let conf = ctx.config().oracle
    let _orcl = {
        connection: null,
        //获取连接
        getConn() {
            if (!this.connection) {
                this.connection = oracledb.getConnection(conf)
            }
            return this.connection
        },
        //关闭连接
        close() {
            if (this.connection && this.connection.close instanceof Function) {
                this.connection.close(function (err) {
                    consolog.error(err)
                })
            }
        },
        commit() {
            this.getConn().commit()
        },
        //执行更新操作
        update(sql, args = []) {
            return this.getConn()
                .then(conn => {
                    return conn.execute(sql, args, {
                        autoCommit: true
                    })
                })
        },
        //执行查询SQL, options参数文档：https://oracle.github.io/node-oracledb/doc/api.html#executeoptions
        select(sql, args = [], options = {}) {
            return this.getConn()
                .then(conn => {
                    return conn.execute(sql, args, options)
                }).then(result => {
                    let rs = _orcl.resultSet(result)
                    _orcl.close()
                    return rs
                })
        },
        //结果集数组处理为对象集合,字段名改为小写
        resultSet(result) {
            let rs = []
            let meta = result.metaData
            let rows = result.rows
            for (row of rows) {
                let obj = {}
                for (let i = 0; i < meta.length; i++) {
                    obj[meta[i]['name'].toLowerCase()] = row[i] ? row[i] : ''
                }
                rs.push(obj)
            }
            return rs
        },
        //快捷方法：插入对象
        insertObject(tableName, obj = {}) {
            // 根据obj拼接 insert sql
            console.log(obj)
            let sql = ''
            return this.update(sql, [])
        },
        //快捷方法：查询全部数据
        selectAll(tableName) {
            return this.select(`select * from ${tableName}`)
        },
        //快捷方法：分页查询 
        selectPage(sql, args) {
            console.log(obj)
            return this.update(sql, args)
        }
    }
    return _orcl
}