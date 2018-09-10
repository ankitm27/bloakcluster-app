const express = require('express');
const router = express.Router();

const favouriteController = require('./../favourite/controller.js');
const helpers = require('./../helpers.js');
/* GET home page. */
router.get('/list', favouriteController.getFavouriteList);
router.post('/add', helpers.validateToken,favouriteController.addFavourite);
router.get('/users/list', helpers.validateToken,favouriteController.getUsersFavourite);
router.get('/gists',favouriteController.getGists);
router.post('/gists/add', helpers.validateToken,favouriteController.addGists);
router.get('/users/gists',helpers.validateToken,favouriteController.getUsersGists);

module.exports = router;
