/**
 * 获取主机名
 */

let os = require('os')
module.exports = function () {
    return os.hostname()
}
