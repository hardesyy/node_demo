const mongoose = require('mongoose')
const db = require('./db');

let userSchema = new mongoose.Schema({
    username:String,
    password:String,
    isAdmin:{
        type:Boolean,
        default: false
    }
})

let UserModel = db.model('User',userSchema)
module.exports = UserModel;