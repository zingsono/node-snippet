let encrypt = require('./encrypt')

module.exports = async function(req_cipher){
    // 对请求与响应报文加密处理
    let ciphertext = await encrypt.des_md5(req_cipher, async function(req_biz){
        global.log.info(`>#${req_biz.requestId}#接口<${req_biz.method}>请求报文：${JSON.stringify(req_biz)}`)
        let micro =  req_biz.method.split('.').slice(0, 3).join('.')
        let res_biz = {errno:'00000', error:'ok', requestId:req_biz.requestId, method:req_biz.method, body:{}}
        try {
            res_biz.body = await require(`../micro/${micro}.micro`)()[req_biz.method](req_biz)    
        } catch (error) {
            console.log(error)
            if(error.code){
                res_biz.errno = error.code
                res_biz.error = error.msg
            }else{
                res_biz.errno = '99999'
                res_biz.error = error.message
                console.error(error)
            }
        }
        global.log.info(`>#${req_biz.requestId}#接口<${req_biz.method}>响应报文：${JSON.stringify(res_biz)}`)
        //响应明文JSON对象
        return res_biz
    })
    //响应密文
    return ciphertext
}
