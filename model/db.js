const mongoose = require('mongoose')
const db = mongoose.createConnection('localhost','top_designer')
db.once('open',()=>{
    console.log("数据库连接成功")
})

module.exports = db