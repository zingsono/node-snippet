let config = require('../config')

//Mongodb ，多个Mongodb数据库，需要多次创建连接
let mongoose = require('mongoose')   
global.schema = mongoose.Schema
//Db1
global.db = mongoose.createConnection(config.mongo.uri, config.mongo.options)

module.exports = {}