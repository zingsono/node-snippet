/**
 *  API Gateway
 */



module.exports = function (ctx, req, res) {

    // 解密请求报文

    // 校验登录会话

    // 校验请求参数

    // 加密响应报文

    let s = ctx.require('service/D10010', req, res)

    return s.apply({a:'haha'})
}
