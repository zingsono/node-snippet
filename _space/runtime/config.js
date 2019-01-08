/**
 * 项目配置文件
 */
module.exports = function () {
    return {
        application:{
            name:'_space',
            version:'v1.0.0',
        },
        server:{
            port: 30625
        },
        baseUrl:'/',
        expose:[''],
        oracle:{
            connectString: 'proxy.unionlive.com:1521/orcl',
            user: 'unionlive',
            password: 'unionlive'
        },
        redis:{},
        mongo:{}
    }
}
