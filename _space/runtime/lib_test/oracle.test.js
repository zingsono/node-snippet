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

/**
 * 打开连接测试
 */
async function open() {
    let conn = await orcl.open()
    console.log(`clientId:${conn.stmtCacheSize}`)
    console.log(`oracleServerVersionString:${conn.oracleServerVersionString}`)
    conn.close()
}
//open()

async function insertOne() {
    orcl.insertOne('ULTAB_SC_API_SCRIPT', {
        id: 'D10010',
        version: '1.7',
        title: '新增交易脚本'
    }).catch(error=>{
        console.log(`Test insertOne catch: ${error}`)
    })
}
insertOne()

async function query(){
    orcl.query('select * from ULTAB_SC_API_SCRIPT').then(rs=>{
        console.log(rs)
    }).catch(error=>{
        console.log(`Test query catch: ${error}`)
    })
}
//query()