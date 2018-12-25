/**
 *  定时器
 */
const Moment = require('moment')
const Cron = require('cron')
const CronJob = Cron.CronJob

const child_process = require('child_process')

let _cron = function (){
    /**
     * 计划任务
     * @param id  任务标识
     * @param cronTime  执行时间cron表达式
     * @param callback 回调函数
     */
    this.scheduled = (id, cronTime, callback) =>{
        console.log('scheduled....................')
        return new CronJob(cronTime, ()=>{
            console.log(`#${id} 执行开始 ${Moment().format()}`)
            callback()
        }, ()=>{
            //执行完成回调
            console.log(`#${id} 执行完成 ${Moment().format()}`)
        }, true, 'Asia/Shanghai')
    }

    /**
     * 执行curl脚本
     * @param script
     * @param callback
     */
    this.curl = (script, callback)=>{
        child_process.exec(script, function (err, stdout, stderr) {
            if (err) {
                console.log('child_process.exec error:' + stderr)
            } else {
                console.log(stdout)
            }
            callback('执行结果回调记录')
        })
    }

    return this
}

module.exports = new _cron()
