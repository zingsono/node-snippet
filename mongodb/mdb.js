/**
 * Mongodb
 */

//const Assert = require('assert')
const MongoClient = require('mongodb').MongoClient
const Logger = require('mongodb').Logger
Logger.setCurrentLogger(function (msg) {
    console.log(msg)
})
let log = new Logger('mdb')

const url = 'mongodb://211.152.57.28:27017'
const dbName = 'task'
function db(){
    return MongoClient.connect(url, { useNewUrlParser: true }).then((client)=> client.db(dbName))
}

db().then((conn)=>{
    return conn.collection('t_cron').find({}).toArray()
}).then((data)=>{
    console.log(data)
    log.info(data)
})

