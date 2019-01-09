/**
 *
 */

module.exports = function (ctx) {
    let orcl = ctx.require('lib/oracle')
    return {
        title: '新增交易脚本',
        //业务逻辑  
        apply() {
            return orcl.insertObject('ULTAB_SC_API_SCRIPT', {
                id: 'D10010',
                version: '1.1',
                title: '新增交易脚本'
            }).then(rows=>{
                console.log(rows)
                return rows
            })
        }
    }
}