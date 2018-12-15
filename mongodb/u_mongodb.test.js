const Mongodb = require('./u_mongodb')

// 测试单条数据插入
// Mongodb.insertOne('t_cron_log', {task_name:'网络监测3'}).then(id=>console.log(id))

Mongodb.find('t_cron_log', {}).then((data)=>{console.log(data)})
