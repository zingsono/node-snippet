model.exports = {

    version: "1.0.1",
    serviceName:"micro",
    devmode: true,
    service: (biz)=>{
        return require('require-all')({
            dirname: __dirname + '/service',
        })[biz.method](biz)
    },
    
}



