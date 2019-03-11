
let encrypt = {
    encode (value, secret){
        return value+secret
    },
    decode (value, secret){
        return value+secret
    },

    /**
     * 报文 DES + MD5 加密解密
     * @param {*} biz 密文参数
     * @param {*} callback 回到业务方法
     */
    async des_md5(biz, callback){
        //解密, 明文json对象
        biz = JSON.parse(biz)
        //回调
        let res = await callback(biz)

        //加密
        let encode = JSON.stringify(res)
        return encode
    }

}

module.exports = encrypt
