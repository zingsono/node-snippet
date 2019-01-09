/**
 * Oracle数据库操作, 需要依赖Oracle client
 * oracledb 模块使用说明文档：https://oracle.github.io/node-oracledb/doc/api.html#getstarted
 */

let oracledb = require('oracledb')
// 自动提交，默认false 
oracledb.autoCommit = false
// 查询超时时间设置 10 seconds, 默认60 seconds
oracledb.queueTimeout = 10000
console.log('** Oracle client library version is ' + oracledb.oracleClientVersionString)

let pool = {}

module.exports = function (ctx) {
    let _orcl = {
        connection: null,
        autoCommit: false,

        /**
         * 通过连接池别名指定数据库连接，默认值：default
         */
        poolAlias: 'default',
        /**
         * 加载连接池
         */
        async pool(poolAttrs = ctx.config().oracle) {
            for (const conf of poolAttrs) {
                if (!pool[conf.poolAlias]) {
                    pool[conf.poolAlias] = await oracledb.createPool(conf)
                }
            }
            return pool
        },
        /**
         * 打开一个连接
         */
        async open() {
            if (!pool[this.poolAlias]) {
                pool = await this.pool()
            }
            if (!pool[this.poolAlias]) {
                return Promise.reject(`Oracle poolAlias "${this.poolAlias} " not found in the connection pool cache`)
            }
            return pool[this.poolAlias].getConnection()
        },
        /**
         * 执行SQL
         * @param {String} sql 
         * @param {Array} bindParams 
         * @param {Object} options 
         */
        async exec(sql, bindParams = [], options = {}) {
            let conn = await this.open()
            let result = await conn.execute(sql, bindParams, options)
            await conn.commit()
            await conn.close()
            console.log('exec result:')
            console.log(result)
            return result
        },
        /**
         * 插入单条数据，根据对象拼接insert脚本
         * @param {String} tableName 数据库表名
         * @param {Object} object    数据对象
         */
        async insertOne(tableName, object = {}) {
            let [cols, vals] = ['', '']
            let values = []
            for (const key in object) {
                [cols, vals] = [cols.concat(',', key), vals.concat(',', `:${key}`)]
                values.push(object[key])
            }
            [cols, vals] = [cols.substring(1), vals.substring(1)]
            let sql = `insert into ${tableName} (${cols}) values (${vals})`
            console.log(`insertOne sql=> ${sql}   args=> ${values}`)
            let result = await this.exec(sql, values)
            return result.rowsAffected
        },
        async query(sql, bindParams = [], options = {}) {
            let result = await this.exec(sql, bindParams, options)
            return this.resultSet(result)
        },
        //==========================================================================================

        //获取连接
        getConn() {
            if (!this.connection) {
                this.connection = oracledb.getConnection(conf)
            }
            return this.connection
        },
        //关闭连接
        close() {
            if (this.connection) {
                this.connection.then(conn => {
                    if (conn) {
                        conn.close(function (err) {
                            console.error(`Close oracle connection Exception：${err}`)
                        })
                    }
                })
            }
        },
        //事务中做更新操作
        transaction(func) {
            _orcl.autoCommit = true
            return func(_orcl).then(() => {
                return _orcl.commit()
            }).catch(err => {
                _orcl.rollback()
                return Promise.reject(err)
            })
        },
        //提交事务
        commit() {
            return this.getConn().then(conn => conn.commit())
        },
        //回滚事务
        rollback() {
            return this.getConn().then(conn => conn.rollback())
        },
        //执行sql
        execute(sql, args = [], options = {}) {
            return this.getConn().then(conn => {
                return conn.execute(sql, args, options).then(result => {
                    conn.close()
                    return result
                })
            })
        },
        //执行更新操作，返回更新记录行数
        update(sql, args = []) {
            return this.execute(sql, args).then(result => {
                return result.rowsAffected
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
        //快捷方法：插入对象,根据obj拼接 insert sql
        insertObject(tableName, obj = {}) {
            let cols = ''
            let vals = ''
            let values = []
            for (const key in obj) {
                cols = cols.concat(',', key)
                vals = vals.concat(',', `:${key}`)
                values.push(obj[key])
            }
            cols = cols.substring(1)
            vals = vals.substring(1)
            let sql = `insert into ${tableName} (${cols}) values (${vals})`
            console.log(`insert sql=> ${sql}   args=> ${values}`)
            //return this.update(sql, values)
            return Promise.resolve(1)
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