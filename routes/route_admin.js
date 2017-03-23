const express = require('express')
const app = express()
const User = require('../model/User')

let resData = null;
exports.initData = (req,res,next)=>{
    resData = {
        code:0,
        msg:"只有管理员进入"
    }
    next()
}

exports.showLogin = (req,res)=>{
    res.render('back_end/login')
}
exports.showAdmin = (req,res)=>{
    res.render('back_end/admin')
}
exports.login = (req,res)=>{
    //如果数据库中有这个用户名,就是管理员
    User.findOne(req.body).then((result)=>{
        if(result && result.isAdmin){
            resData.code = 1
            resData.msg = "登录成功"
            res.cookie('userInfo',JSON.stringify({uid:result._id,username:result.username}),{maxAge:7*24*60*60*1000})
            res.json(resData)
        }else{
            res.json(resData)
        }
    })
}