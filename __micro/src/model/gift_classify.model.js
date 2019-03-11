/**
 * 礼品分类
 */

/**
 * Model操作文档： https://mongoosejs.com/docs/api.html#Model
 * @param 模型名称
 * @param Scheam
 * @param 集合名称，必须指定
 * 
 * Model没有定义的字段，不会插入到Mongodb数据库中
 */
module.exports = global.db.model('gift_classify', new global.schema({
    classify_no: String,
    classify_name: String,
    img_url: String,
    rank: Number,
    remark:String,
    created_at: String,
    updated_at: String,
    created_by: String,
    updated_by: String
}), 'gift_classify')


