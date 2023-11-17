const express = require('express')
const router = express.Router()
const authentification = require('../middlewares/authentification')
const Controller = require("../controllers/controllerClient");

router.post('/register', Controller.register); // REGISTER ALL ROLE
router.post('/login', Controller.login); // LOGIN ALL ROLE
router.post('/reset-password', Controller.resetPassword) // RESET PASSWORD EMAIL
router.get('/liquid', authentification, Controller.readAllLiquid); // READ ALL PRODUCT LIQUID CLIENT/ADMIN
router.post('/liquid/:id', authentification, Controller.addFavorite); // ADD TO FAVORITES CLIENT
router.get('/fav', authentification, Controller.readFav); // READ FAVORITES CLIENT
router.delete('/fav/:id', authentification, Controller.deleteFav); // DELELET FAVORITES CLIENT

module.exports = router