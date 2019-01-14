/**
 * 项目配置文件
 */
module.exports = function () {
    return {
        application: {
            name: '_space',
            version: 'v1.0.0',
        },
        server: {
            port: 30625
        },
        baseUrl: '/',
        expose: [''],
        //可配置多个数据库连接，使用连接池别名区分
        oracle: [
            {
                poolAlias: 'default',
                poolMin: 0,
                poolMax: 4,
                queueTimeout: 10000,
                connectString: 'proxy.unionlive.com:1521/orcl',
                user: 'unionlive',
                password: 'unionlive'
            }
        ],
        redis: {},
        mongo: [
            {  
                url: 'mongodb://localhost:27017',
                db: 'task',
                default: true
            }
        ]
    }
}
