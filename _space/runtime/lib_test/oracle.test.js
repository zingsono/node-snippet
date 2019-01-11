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
    }).catch(error => {
        console.log(`Test insertOne catch: ${error}`)
    })
}
//insertOne()

async function query() {
    orcl.query('select * from ULTAB_SC_API_SCRIPT').then(rs => {
        console.log(rs)
    }).catch(error => {
        console.log(`Test query catch: ${error}`)
    })
}
//query()


async function transaction() {
    let i = 7

    let t = await orcl.transaction(async (handle)=>{    
        while(i++<9){
            try {
                let rs = await handle.update('update ULTAB_SC_API_SCRIPT set status = :status where id = :id and version = :v ', [i, 'D10010', '1.4'])
                await handle.update('update ULTAB_SC_API_SCRIPT set status = :status where id = :id and version = :v ', [i+'999999999999999', 'D10010', '1.5'])
                console.log(`i=${i} rs=${rs}`)    
            } catch (error) {
                //异常回滚
                throw new Error(error)
            }
        }    
    })
}
//transaction()



async function transaction1() {
    let i = 0
    while(i++<4){
        let rs = await orcl.update('update ULTAB_SC_API_SCRIPT set status = :status where id = :id and version = :v ', [i, 'D10010', '1.4'])
        console.log(`i=${i} rs=${rs}`)
        /**
         orcl.update('update ULTAB_SC_API_SCRIPT set status = :status where id = :id and version = :v ', [i, 'D10010', '1.4']).then(rs => {
            
        }).catch(error => {
            console.log(`Test query catch: ${error}`)
        }) 
         */
        
    }
    
}
//transaction()