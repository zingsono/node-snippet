/**
 * 服务状态
 * @returns {{status: string}}
 */
module.exports = function () {
    return {'status':'ok', 'date':require('./date')()}
}
