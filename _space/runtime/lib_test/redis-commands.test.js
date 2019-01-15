var commands = require('redis-commands')

commands.list.forEach(function (command) {
    console.log(command)
})