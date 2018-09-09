const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const fieldValidation = require('./fieldValidation.js');
const helpers = require('./helpers.js');
const responseFunction = require('./../utils/responseFunction.js');
const logger = require('./../utils/logging.js');
const config = require('./../config/index.js');

const users = {
    signUp: (req, res) => {
        console.log("req,body",req.body);
        fieldValidation.signUp(req.body)
            .then((fieldValidationResult) => {
                return helpers.checkEmailIsPresent(req.body.email)
                    }).then((checkEmailIsPresentResult) => {
                        const userId = uuidv4();
                        const hashPassword = bcrypt.hashSync(req.body.password);
                        return helpers.saveInDb(userId, req.body.email, hashPassword);
                    }).then((apiResult) => {
                        logger.trace("user registered successfully",apiResult);
                        return responseFunction.sendSuccess("User is successfully SignUp",res,{});
                    }).catch((err) => {
                        logger.trace('Problem with registering in user',err);
                        return responseFunction.sendError(err,res);
                    })
            
    },

    login: (req, res) => {
        fieldValidation.login(req.body)
            .then((fieldValidationResult) => {
                return helpers.findUserDocuments(req.body.email)
                    }).then((findUserDocuments) => {
                        req.body.userId = findUserDocuments.userId;
                        return helpers.validatePassword(req.body.email,findUserDocuments.userId,req.body.password,findUserDocuments.password)
                    }).then((validatePassword) => {
                        logger.trace("Login successfully",req.body.email);
                        return responseFunction.sendSuccess("Login successfully",res,{userId:req.body.userId,token:validatePassword});
                        // return responseFunction.sendError("Login failed",res)
                }).catch((err) => {
                        return responseFunction.sendError(err,res);
                })
            
    },

};
module.exports = users;