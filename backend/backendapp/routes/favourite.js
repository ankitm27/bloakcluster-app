const express = require('express');
const router = express.Router();

const favouriteController = require('./../favourite/controller.js');
const helpers = require('./../helpers.js');
/* GET home page. */
router.get('/list', favouriteController.getFavouriteList);
router.post('/add', helpers.validateToken,favouriteController.addFavourite);
router.get('/users/list', helpers.validateToken,favouriteController.getUsersFavourite);


module.exports = router;
