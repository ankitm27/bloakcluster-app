const helpers = require('./helper.js');
const responseFunction = require('./../utils/responseFunction.js');
const logger = require('./../utils/logging.js');
const fieldValidation = require('./fieldValidation.js');

const favourite = {
    getFavouriteList:(req,res) => {
        helpers.getFavouriteList()
        .then((getFavouriteList) => {
                logger.trace("Successfully get data",getFavouriteList);
                return responseFunction.sendSuccess("Successfully get list",res,getFavouriteList);
            }).catch((err) => {
                logger.trace("Error in fetching the list",err);
                return responseFunction.sendError(err,res);
            })
    },
    addFavourite:(req,res) => {
        fieldValidation.addFavourite(req.body)
        .then((fieldValidationResult) => {
                return helpers.addIntoFavouriteList(req.body.userId, req.body.repoName)
            }).then((getFavouriteList) => {
                console.log("getFavouriteList",getFavouriteList);
                logger.trace("Successfully added favourite",getFavouriteList);
                return responseFunction.sendSuccess("Successfully added favourite",res,{});
            }).catch((err) => {
                logger.trace("Error in adding the favourite",err);
                return responseFunction.sendError(err,res);
            })
    },
    getUsersFavourite:(req,res) => {
        fieldValidation.getUsersFavourite(req.query)
        .then((fieldValidation) => {
                return helpers.getUserFavouriteList(req.query.userId)
            }).then((getFavouriteList) => {
                logger.trace("Successfully get data",getFavouriteList);
                return responseFunction.sendSuccess("Successfully get list",res,getFavouriteList);
            }).catch((err) => {
                logger.trace("Error in fetching the list",err);
                return responseFunction.sendError(err,res);
            })
    },

};

module.exports = favourite;