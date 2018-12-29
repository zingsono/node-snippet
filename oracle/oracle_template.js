/**
 * Oracle数据库操作，依赖 Oracle client
 *
 * insert 返回成功记录数
 * update 返回成功记录数
 * delete 返回成功记录数
 * select 返回List集合
 * page   返回分页对象，{pageSize:10,pageNum:1,data:[{},{}] }
 *
 *
 */
let oracledb = require('oracledb')

let DB = function (config){
    this.config = config||{
        user: 'unionlive',
        password: 'unionlive',
        connectString: 'proxy.unionlive.com:1521/orcl'
    }
}

DB.prototype.setConfig = function(config){
    this.config = config
}

DB.prototype.getConn = function(){
    return new Promise((resolve, reject)=>{
        oracledb.getConnection(this.config, function (err, connection) {
            if(err){
                reject(err)
                return
            }
            resolve(connection)
        })
    })
}

DB.prototype.execute = function(sql){
    return this.getConn().then((conn)=>{
        return conn.execute(sql)
    })
}

DB.prototype.result = function(sql){
    return this.execute(sql).then(result=>{
        console.log('Column metadata: ', result.metaData)
        console.log('Query results: ')
        console.log(result.rows)
    })
}

DB.prototype.insert = function(sql){
    return this.execute(sql).then(result=>{
        console.log('Column metadata: ', result.metaData)
        console.log('Query results: ')
        console.log(result.rows)
    })
}

DB.prototype.update = function(sql){
    return this.execute(sql).then(result=>{
        console.log('Column metadata: ', result.metaData)
        console.log('Query results: ')
        console.log(result.rows)
    })
}

DB.prototype.delete = function(sql){
    return this.execute(sql).then(result=>{
        console.log('Column metadata: ', result.metaData)
        console.log('Query results: ')
        console.log(result.rows)
    })
}


DB.prototype.page = function(sql){
    return this.execute(sql).then(result=>{
        console.log('Column metadata: ', result.metaData)
        console.log('Query results: ')
        console.log(result.rows)
    })
}

module.exports = new DB()
