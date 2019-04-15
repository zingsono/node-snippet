module.exports = {
    name:'chrome-mql',
    version:'1.0.0',
    server:{
        port:29001
    },
    mongo:{
        uris:{
            tbk:'mongodb://localhost:27017/tbk?poolSize=4'
        },
        options:{useNewUrlParser:true}
    }
}