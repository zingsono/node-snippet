/**
 *
 */

module.exports = function (ctx) {
    let orcl = ctx.require('lib/oracle')
    return {
        title:'新增接口',
        //业务逻辑  
        async apply() {
            let rs = await orcl.selectAll('ULTAB_SC_ROLE')
            console.log(rs)
            return rs
        }
    }
}
