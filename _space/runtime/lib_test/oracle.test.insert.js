
/**
 * Oracle操作测试
 */

// 构建统一上下文对象
let ctx = {
    require(rt, req, res) {
        rt = '../../runtime/' + rt
        delete require.cache[require.resolve(rt)] // 文件更新时需要清除缓存或者重启服务
        return require(rt)(ctx, req, res)
    },
    config() {
        return ctx.require('config')
    }
}

let orcl = ctx.require('lib/oracle')

let t = {

    insert(){
        orcl.insertObject('ULTAB_SC_API_SCRIPT', [{id:'D10011', version:'4.6'}, {id:'D10011', version:'4.7'}]).catch(err=>{
            console.error(`:::::::${err}`)
        }).then(rs=>{
            console.log(rs)
        })
    }
}
t.insert()