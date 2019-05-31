module.exports = {
    name:'chrome-mql',
    version:'1.0.0',
    server:{
        port:29001
    },
    mongo:{
        uris:{
            tbk: 'mongodb://dev:dev1qaz2wsx@mongodb.s.zingson.com:37017/dev'
        },
        'options' : {
            'useNewUrlParser' : true,
            'authSource' : 'admin',
            'authMechanism': 'SCRAM-SHA-1',
            'poolSize' : 4
        }
    }
}