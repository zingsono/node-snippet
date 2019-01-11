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

/**
 * 加载连接池
 */
function poolInit(poolAttrs = []) {
    for (const conf of poolAttrs) {
        if (!pool[conf.poolAlias]) {
            pool[conf.poolAlias] = oracledb.createPool(conf)
        }
    }
}

module.exports = function(ctx) { 
    let _orcl = {
        /**
         * 通过连接池别名指定数据库连接，默认值：default
         */
        poolAlias: 'default',
        /**
         * 打开一个连接
         */
        async open() {
            if (!pool[this.poolAlias]) {
                poolInit(ctx.config().oracle)
            }
            if (!pool[this.poolAlias]) {
                throw `Oracle poolAlias "${this.poolAlias} " not found in the connection pool cache`
            }
            let connectionPool = await pool[this.poolAlias]
            return connectionPool.getConnection()
        },

        /**
         * 数据库更新操作，包括 [ insert,delete,update ] 
         * return结果为异步执行函数数组，事务操作使用多个异步函数即可
         * @param {Function} exec 执行函数，如：(conn)=>{ return [conn.execute('update table set age=1 where id = :id',[10])] } 
         */
        execute(exec){
            return this.open().then(conn=>{
                return Promise.all(exec(conn)).then(rs => {
                    return conn.commit().then(()=>{
                        let result = []
                        for (const r of rs) {
                            result.push(r.rowsAffected)
                        }
                        return result.length===1?result[0]:result
                    }).catch(error=>{throw error})
                }).catch(err => {
                    return conn.rollback().then(()=>{throw err}).catch(error=>{throw error})
                }).finally(() => {
                    conn.close().catch(err=>console.error(`oracle conn.close error ${err} `))
                    console.log('update-finally-close()')
                })
            }).catch(err => {
                throw err
            })
        },
        insert(sql, bindParams = []){
            return this.execute(conn=>{ return [conn.execute(sql, bindParams)] })
        },
        delete(sql, bindParams = []){
            return this.execute(conn=>{ return [conn.execute(sql, bindParams)] })
        },
        update(sql, bindParams = []){
            return this.execute(conn=>{ return [conn.execute(sql, bindParams)] })
        },
        /**
         * 插入单条数据，根据对象拼接insert脚本
         * @param {String} tableName 数据库表名
         * @param {Object} object    数据对象或者对象集合，如果是数组则在一个事务中
         */
        insertObject(tableName, object = {}) {
            return this.execute(conn=>{
                let functions = []
                let objArray = []
                if(object instanceof Array){
                    objArray = objArray.concat(object)
                } else if(object instanceof Object){
                    objArray.push(object)
                } else {
                    throw '==>insert object type error!!!'
                }
                for (const object of objArray) {
                    let [cols, vals] = ['', '']
                    let values = []
                    for (const key in object) {
                        [cols, vals] = [cols.concat(',', key), vals.concat(',', `:${key}`)]
                        values.push(object[key])
                    }
                    [cols, vals] = [cols.substring(1), vals.substring(1)]
                    let sql = `insert into ${tableName} (${cols}) values (${vals})`
                    console.log(`oracle insert sql=> ${sql}   args=> ${values}`)
                    functions.push(conn.execute(sql, values))
                }
                return functions
            })
        },
        /**
         * 数据库查询
         * @param {String} sql
         * @param {Array} bindParams
         * @param {Object} options
         */
        query(sql, bindParams = [], options = {}) {
            return this.open().then(conn=>{
                return Promise.all([conn.execute(sql, bindParams, options)]).then(rs => {
                    return rs[0]
                }).catch(err => {
                    throw err
                }).finally(() => {
                    conn.close().catch(err=>console.error(`oracle conn.close error ${err} `))
                    console.log('update-finally-close()')
                })
            }).catch(err => {
                throw err
            })
        },
        /**
         * 结果集数组处理为对象集合,字段名改为小写
         * @param {*} result 
         */
        resultSet(result) {
            let [rs, metas, meta, rows] = [[], [], result.metaData, result.rows]
            for (let i = 0; i < meta.length; i++) {
                metas.push(meta[i]['name'].toLowerCase())
            }
            for (const row of rows) {
                let obj = {}
                for (let i = 0; i < metas.length; i++) {
                    obj[metas[i]] = row[i] ? row[i] : ''
                }
                rs.push(obj)
            }
            return rs
        },
        /**
         * SQL查询
         * @param {*} sql 
         * @param {*} bindParams 
         */
        select(sql, bindParams = []){
            return this.query(sql, bindParams, {extendedMetaData:false}).then(rs=>{
                return _orcl.resultSet(rs)
            })
        },
        /**
         * 查询全部数据
         * @param {*} tableName 
         */
        selectAll(tableName) {
            return this.select(`select * from ${tableName}`)
        },
        /**
         * 分页查询
         * @param {*} sql 
         * @param {*} args 
         */
        selectPage(sql, args) {
            console.log(obj)
            return this.select(sql, args)
        }
    }
    return _orcl
}
