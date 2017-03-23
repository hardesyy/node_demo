const express = require('express')
const route = require('./routes/route')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use('/public',express.static('./public'))
app.set('view engine','ejs')
app.use('/admin',require('./routes/admin'))
app.get('/',route.showIndex)
app.listen(80)