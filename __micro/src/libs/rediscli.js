let config = require('../config')

let Redis = require('ioredis')

if(config.redis.isCluster){
    global.redis = new Redis.Cluster(config.redis.cluster, {})
}else{
    global.redis = new Redis(config.redis.conf)
}
module.exports = {}
