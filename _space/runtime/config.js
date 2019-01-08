/**
 * 项目配置文件
 */
module.exports = function () {
    return {
        appName:'_space',
        server:{
            port: 30625
        },
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
