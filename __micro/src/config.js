/**
 * 全局配置
 */
module.exports = {
    devmode: true,
    app: {
        version: '1.0.1',
        name:'gift'    //每个服务的唯一标识，请勿修改
    },
    server:{
        port: 39201
    },
    mongo:{
        uri: 'mongodb://unionlive:unionlive@211.152.57.29:39017/unionlive',
        options:{ useNewUrlParser: true, authSource:'admin', poolSize:4 }
    },
    redis:{
        conf:{
            host:'211.152.57.29',
            port:39379,
            db: 0
        },
        isCluster:false,
        cluster:[{host:'', port:6379}]
    }
} 