const express = require('express');
const router = express.Router();

const userController = require('./../users/controller.js');

/* GET home page. */
router.post('/signup', userController.signUp);
router.post('/login', userController.login);


module.exports = router;
