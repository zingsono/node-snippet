/**
 * 接口查询
 */


module.exports = function (ctx) {
    let orcl = ctx.require('lib/oracle')

    return {
        title: '开发接口查询',
        description: '接口列表',
        // 参数定义，用于参数校验与请求文档生成  【非必须】
        props: {
            id: {
                remark: '接口编号'
            },
            script: {
                remark: 'JavaScript脚本代码'
            }
        },
        //用于生成响应文档  【非必须】
        apiResponse: {
            props: {
                id: {
                    remark: '接口编号'
                }
            },
            errCode: {
                10001: '编号格式错误'
            }
        },
        //业务逻辑
        async apply() {
            let rs = await orcl.select('select * from ULTAB_SC_USER')
            console.log(rs)
            return rs
        }
    }
}