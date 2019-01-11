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

let T = {
    //打开连接测试
    async open() {
        let conn = await orcl.open()
        console.log(`clientId:${conn.stmtCacheSize}`)
        console.log(`oracleServerVersionString:${conn.oracleServerVersionString}`)
        conn.close()
    },
    //事务操作
    async transaction() {
        let conn = await orcl.open()
        Promise.all([
            conn.execute('update ULTAB_SC_API_SCRIPT set status = :status where id = :id and version = :v ', [12, 'D10010', '1.4']),
            conn.execute('update ULTAB_SC_API_SCRIPT set status = :status where id = :id and version = :v ', [13, 'D10010', '1.5']),
            conn.execute('update ULTAB_SC_API_SCRIPT set status = :status where id = :id and version = :v ', [1444444444444444444444, 'D10010', '1.7']),
        ]).then(rs => {
            console.log(rs)
            conn.commit()
        }).catch(err => {
            conn.rollback()
            console.log(err)
        }).finally(() => {
            conn.close()
            console.log('finally-close()')
        })
    },
    // handle返回数组
    async transaction1(handle) {
        let conn = await orcl.open()
        return Promise.all(handle(conn)).then(rs => {
            console.log(rs)
            conn.commit()
            return rs
        }).catch(err => {
            conn.rollback()
            console.log(err)
            throw err
        }).finally(() => {
            conn.close()
            console.log('finally-close()')
        })
    },
    async select(sql, bindParams) {
        let conn = await orcl.open()
        return conn + sql + bindParams
    },
    sqlArray(sql, arr){
        return [sql, arr]
    },
    async update(exec){
        let conn = await this.open()
        return Promise.all(exec(this.sqlArray)).then(rs => {
            conn.commit()
            return rs
        }).catch(err => {
            conn.rollback()
            throw err
        }).finally(() => {
            conn.close()
            console.log('update-finally-close()')
        })
    },
}
T.update(exec=>{
    return exec('update ULTAB_SC_API_SCRIPT set status = :status where id = :id and version = :v ', [12, 'D10010', '1.4'])
}).then(rs => {
    console.log(rs)
}).catch(err => {
    console.log(err)
})

/**
T.transaction1((conn) => {
    return [
        conn.execute('update ULTAB_SC_API_SCRIPT set status = :status where id = :id and version = :v ', [12, 'D10010', '1.4']),
        conn.execute('update ULTAB_SC_API_SCRIPT set status = :status where id = :id and version = :v ', [13, 'D10010', '1.5']),
        conn.execute('update ULTAB_SC_API_SCRIPT set status = :status where id = :id and version = :v ', [14, 'D10010', '1.7'])
    ]
}).then(rs => {
    console.log(rs)
}).catch(err => {
    console.log(err)
})
 */