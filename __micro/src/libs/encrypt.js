
/**
 * 加密（DES+MD5）
 */
module.exports.encode = function(value, secret){
    return value+secret
}

/**
 * 解密（DES+MD5）
 */
module.exports.decode = function(value, secret){
    return value+secret
}

