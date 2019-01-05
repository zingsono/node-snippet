/**
 * 项目配置文件
 */
module.exports = function () {
    return {
        appName:'_space',
        version:'v1.0.0',
        baseUrl:'/',
        expose:[''],
        oracle:{
            user:'',
            password: '',
            connectString:''
        },
        redis:{},
        mongo:{}
    }
}
