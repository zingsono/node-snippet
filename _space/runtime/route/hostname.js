/**
 * 获取主机名
 */

let os = require('os')
module.exports = async function () {
    return {
        hostname: os.hostname()
    }
}