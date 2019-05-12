/** */

( async ()=>{
    let uri = 'mongodb://unionlive:unionlive@211.152.57.29:39017/logs?authSource=admin&authMechanism=SCRAM-SHA-1&poolSize=4'

    const MongoClient = require('mongodb').MongoClient
    let client = await MongoClient.connect(uri, { useNewUrlParser: true })
    let db = await  client.db()

    //let stats = await db.stats()
    //console.log(stats)

    let command = db.command({shardCollection: 'logs.log_20190427', key: {_id:'hashed'}})
    console.log(command)
})()
