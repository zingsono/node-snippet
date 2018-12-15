/**
 * node-mongodb-native 3.1 api  操作类封装
 */
//const Assert = require('assert')
const MongoClient = require('mongodb').MongoClient

let defaultConfig = {
    url: 'mongodb://211.152.57.28:27017',
    dbName: 'task'
}

let M = function () {
    this.config = defaultConfig
}

M.prototype.setConfig = function(conf){
    this.config = conf
}

/**
 * 获取数据库连接
 * @returns {Promise<Db | never>}
 */
M.prototype.getConnection = function(){
    return MongoClient.connect(this.config.url, { useNewUrlParser: true }).then((client)=> client.db(this.config.dbName))
}

/**
 *
 * @param tableName
 * @returns {Promise<Collection | never>}
 */
M.prototype.collection = function(tableName){
    return this.getConnection().then((db)=>{
        return db.collection(tableName)
    })
}

/**
 * 向集合中插入单条记录 参考文档：http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#insertOne
 * @param tableName
 * @param doc
 * @returns {Promise<Collection | never | never>}
 */
M.prototype.insertOne = function (tableName, doc) {
    return this.collection(tableName).then((collection)=>{
        return collection.insertOne(doc)
    }).then((result)=>{
        // result 类型参考文档：http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#~insertOneWriteOpResult
        //返回插入文档对象ID
        return result.insertedId
    })
}

/**
 *  http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#find
 * @param tableName
 * @param query
 * @param options
 * @returns {Promise<Collection | never | never | void | T[]>}
 */
M.prototype.find = function(tableName, query, options){
    return this.collection(tableName).then(collection=>{
        return collection.find(query, options)
    }).then(cursor=>{
        // 返回值Cursor对象，文档：http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html
        return cursor.toArray()
    })
}

module.exports = new M()
