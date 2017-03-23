const express = require('express')
const router = express.Router();
const routeAdmin = require('./route_admin')

router.use(routeAdmin.initData)

router.get('/',routeAdmin.showAdmin)
router.get('/login',routeAdmin.showLogin)
router.post('/login',routeAdmin.login)
module.exports = router;