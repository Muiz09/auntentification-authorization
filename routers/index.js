const express = require('express');
const router = express.Router();
const admRouter = require('./routerAdmin')
const clientRouter = require('./routerClient')

router.use('/adm', admRouter)
router.use('/', clientRouter)

module.exports = router;