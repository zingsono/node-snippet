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

module.exports = function(ctx) { 
    let _orcl = {
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
            if(this.connection){
                return this.connection    
            }
            return pool[this.poolAlias].getConnection()
            
        },
        /**
         * 执行查询SQL
         * @param {String} sql
         * @param {Array} bindParams
         * @param {Object} options
         */
        async exec(sql, bindParams = [], options = {}) {
            let conn = await this.open()
            let result = await conn.execute(sql, bindParams, options)
            //属性connection为空时实时提交
            if(!this.connection){
                await conn.commit()
                await conn.close()
            }
            console.log('exec result:')
            console.log(result)
            return result
        },
        /**
         * 事务
         * @param {Function} handle 事务操作函数  
         */
        async transaction(handle){
            let conn = await this.open()
            this.connection = conn
            try {
                await handle(this)
                await conn.commit()
                return Promise.resolve(1)
            } catch (error) {
                await conn.rollback()
                return Promise.reject(error)
            } finally {
                await conn.close()
                this.connection = null
            }
        },
        /**
         * 执行更新SQL
         * @param {String} sql 
         * @param {Array} bindParams 
         * @param {Object} options 
         */
        async update(sql, bindParams = []) {
            let result = await this.exec(sql, bindParams)
            return result.rowsAffected
        },
        /**
         * 数据库查询
         * @param {String} sql
         * @param {Array} bindParams
         * @param {Object} options
         */
        async query(sql, bindParams = []) {
            let result = await this.exec(sql, bindParams)
            return this.resultSet(result)
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
                [cols, vals] = [
                    cols.concat(',', key),
                    vals.concat(',', `:${key}`)
                ]
                values.push(object[key])
            }
            [cols, vals] = [cols.substring(1), vals.substring(1)]
            let sql = `insert into ${tableName} (${cols}) values (${vals})`
            console.log(`insertOne sql=> ${sql}   args=> ${values}`)
            let rowsAffected = await this.update(sql, values)
            return rowsAffected
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
        /**
         * 查询全部数据
         * @param {*} tableName 
         */
        selectAll(tableName) {
            return this.query(`select * from ${tableName}`)
        },
        /**
         * 分页查询
         * @param {*} sql 
         * @param {*} args 
         */
        selectPage(sql, args) {
            console.log(obj)
            return this.query(sql, args)
        }
    }
    _orcl.connection = _orcl.open()
    return _orcl
}
