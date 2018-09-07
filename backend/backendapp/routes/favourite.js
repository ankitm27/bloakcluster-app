const express = require('express');
const router = express.Router();

const favouriteController = require('./../favourite/controller.js');

/* GET home page. */
router.get('/list', favouriteController.getFavouriteList);
router.post('/add', favouriteController.addFavourite);
router.get('/users/list', favouriteController.getUsersFavourite);


module.exports = router;
