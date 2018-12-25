const cron = require('../component/u_cron')

/**
 * 状态定义：
 * prepare   准备运行
 * run       正在运行
 * stop      停止状态
 * remove    删除任务
 */

//测试数据定义
let taskArray = [
    {id:'task01', name:'每10秒执行一次', status:'', cron:'*/10 * * * * *', curl:'curl http://www.baidu.com'},
    {id:'task01', cron:'*/9 * * * * *'},
]

/**
 * 监控计划任务，启动执行时间的任务
 */
cron.scheduled('root_timer', '*/5 * * * * *', () => {
    taskArray.forEach((v)=>{
        //取下次执行时间

        console.log(v)
    })
})

