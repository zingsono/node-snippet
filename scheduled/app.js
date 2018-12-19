const Assert = require('assert')
const Moment = require('moment')
const Cron = require('cron')
const CronJob = Cron.CronJob
const Express = require('express')
let app = Express()
const Mongo = require('./u_mongodb')
const Config = require('./config')

// 读配置文件中Mongodb服务连接
Mongo.setConfig(Config.mongo)

/**
 * 计划任务
 * @param id  任务标识
 * @param cronTime  执行时间cron表达式
 * @param callback 回调函数
 */
function scheduled(id, cronTime, callback) {
    console.log('scheduled....................')
    return new CronJob(cronTime, ()=>{
        console.log(`#${id} 执行开始 ${Moment().format()}`)
        callback()
    }, ()=>{
        //执行完成回调
        console.log(`#${id} 执行完成 ${Moment().format()}`)
    }, true, 'Asia/Shanghai')
}

// 全局定时器，1分钟执行一次，监控5分钟后待执行任务
scheduled('root_timer', '0 0/1 * * * * *', ()=>{
    Mongo.find('t_cron').then((array)=>{
        // 检测下次执行时间小于5分钟的任务，加入计划任务等待执行
        console.log(array)
    })
})


//配置路由
app.get('/', function (req, res) {
    res.send('Hello World')
})

// 启动服务
app.listen(8901)

console.log('Scheduled server start ...')


