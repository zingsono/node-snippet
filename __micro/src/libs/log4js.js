let log4js = require('log4js')

log4js.configure({
    appenders: { 
        cheese: { type: 'file', filename: '../logs/cheese.log' },
        console: { type: 'console', } 
    },
    categories: { default: { appenders: ['console', 'cheese'], level: 'debug' } }
})

global.log = log4js.getLogger()

global.log.debug('>> log4js start init')

module.exports = {}