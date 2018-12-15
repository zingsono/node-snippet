const Assert = require('assert')
const MongoClient = require('mongodb').MongoClient
const Logger = require('mongodb').Logger
const Config = require('./config')
const Cron = require('cron')
const Express = require('express')
let app = Express()

/**
 * Mongodb日志
 */
Logger.setCurrentLogger(function (msg) {
    console.log(msg)
})

const dbName = 'task'
MongoClient.connect(Config.mongodb.uri, function (err, client) {
    Assert.equal(null, err)
    console.log('Connected successfully to server')
    client.db(dbName).on('close', function (error) {
        Logger.info(error);
    })

    app.listen(8901)
})



//--------------------------------------------------------------------------------------
const M_URL = 'mongodb://211.152.57.28:27017'
const M_DBNAME = 'task'
Mongo.connect(M_URL, function (err, client) {
    Assert.equal(null, err)
    console.log('Connected successfully to server')
    client.db(M_DBNAME)
    client.close()
})


/**
 * 定时任务
 */
const Cron = require('cron')
const CronJob = Cron.CronJob
for (let i = 0; i < 10; i++) {
    Task(function (id) {
        new CronJob('* * * * * *', function () {
            console.log(`#${id} second${new Date().getTime()}`)
        }, null, true, 'Asia/Shanghai')
    }, i)
}

function Task(callback, i) {
    callback(i)
}


/**
 * WEB 服务
 */
const Express = require('express')
var app = Express()

app.get('/', function (req, res) {
    res.send('Hello World')
})
app.listen(8901)




