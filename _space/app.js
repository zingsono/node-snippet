let express = require('express')
let app = express()
app.disable('x-powered-by')
app.use(express.static('public'))
app.all('/space/:rt', function (req, res) {
    let runtime = `./runtime/${req.params.rt}`
    delete require.cache[require.resolve(runtime)]
    let rs = require(runtime)(req, res)
    res.send(rs)
})
app.listen(30625)
console.log('Server http://localhost:30625/')
