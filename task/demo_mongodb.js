const Assert = require('assert')
const MongoClient = require('mongodb').MongoClient

const M_URL = 'mongodb://211.152.57.28:27017'
const M_DBNAME = 'task'
MongoClient.connect(M_URL, {useNewUrlParser: true}, function (err, client) {
    Assert.equal(null, err)
    console.log('Connected successfully to server')
    let db = client.db(M_DBNAME)
    let collection = db.collection('t_cron')
    collection.find({}).toArray(function (err, result) {
        Assert.equal(null, err)
        console.log(result)
    })
})

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
