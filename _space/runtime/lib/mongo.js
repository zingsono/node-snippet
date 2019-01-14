/**
 * @auth Zengs
 * @date 2019-01-14
 * @description  
 *  NPM: https://www.npmjs.com/package/mongodb  mongodb 3.1.0
 * 官网API文档：http://mongodb.github.io/node-mongodb-native/3.1/api/
 */
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let pool = {}

/**
 * 加载连接
 */
function poolInitialize(poolAttrs = []) {
    for (const conf of poolAttrs) {
        if (!pool[conf.db]) {
            if(conf.default){
                pool['default'] = MongoClient.connect(conf.url, conf.options)    
            }
            pool[conf.db] = MongoClient.connect(conf.url, conf.options)
        }
    }
}

module.exports = function(ctx) { 
    let _M = {
        dbAlias: 'default',
        /**
         * 指定数据库名，对应配置字段：db
         * @param {String} alias 
         */
        use(alias){
            this.dbAlias = alias
            return _M
        },
        /**
         * api文档：http://mongodb.github.io/node-mongodb-native/3.1/api/Db.html
         */
        async db(){
            if(!pool[this.dbAlias]){
                poolInitialize(ctx.config().mongo)
            }
            if (!pool[this.dbAlias]) {
                throw `MongoDB db "${this.dbAlias} " not found in the connection pool cache`
            }
            let dbConn = await pool[this.dbAlias]
            return dbConn.db(this.name)
        },
        /**
         * api文档：http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html  
         * collection 增删查该操作参考api文档
         * insertOne  insertMany
         * updateOne  updateMany
         * find   findOne findOneAnd*
         * @param {String} collectionName 
         */
        async collection(collectionName){
            return this.open().then(db=>{
                return db.collection(collectionName)
            })
        }
    }
    return _M
}




