/**
 * 定时任务
 */
const Cron = require('cron')
const CronJob = Cron.CronJob
/*
for (let i = 0; i < 3; i++) {
    Task(function (id) {
        new CronJob('* * * * * *', function () {
            console.log(`#${id} second${new Date().getTime()}`)
        }, null, true, 'Asia/Shanghai')
    }, i)
}

function Task(callback, i) {
    callback(i)
}
*/

new CronJob('* * * * * *', function () {
    console.log(`# second${new Date().getTime()}`)
}, null, true, 'Asia/Shanghai')

console.log('cron_demo.js>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
