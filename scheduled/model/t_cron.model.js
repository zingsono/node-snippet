/**
 * 对应Mongodb集合
 */
class TCron {
    constructor(){
        this._id = ''
    }
    getTableName(){
        return 't_cron'
    }
}
export default new TCron()
