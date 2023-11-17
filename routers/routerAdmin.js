const express = require('express')
const router = express.Router()
const authentification = require('../middlewares/authentification')
const authorization = require('../middlewares/authorization')
const Controller = require('../controllers/controllerAdmin')

router.get('/user', authentification, authorization, Controller.readAllUser) // READ USER ADM
router.post('/liquid', authentification, authorization, Controller.addLiquid) // POST LIQUID ADM
router.put('/liquid/:id', authentification, authorization, Controller.editLiquid) // PUT LIQUID ADM
router.delete('/liquid/:id', authentification, authorization, Controller.deleteLiquid) // DELETE LIQUID ADM

module.exports = router