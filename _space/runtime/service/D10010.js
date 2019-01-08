/**
 *
 */

module.exports = function (ctx) {
    let orcl = ctx.require('lib/oracle')
    return {
        title:'新增接口',
        description:'开发界面添加接口',
        // 参数定义，用于参数校验与请求文档生成  【非必须】
        props: {
            id:{ remark:'接口编号' },
            script:{ remark:'JavaScript脚本代码' }
        },
        apply(data){
            orcl.insert('table_name', [data.id, data.script])
            return this.doc
        },
        //用于生成响应文档  【非必须】
        apiResponse:{
            props:{ id:{ remark:'接口编号'} },
            errCode: { 10001:'编号格式错误' }
        }
    }
}
