const helpers = require('./helper.js');
const responseFunction = require('./../utils/responseFunction.js');
const logger = require('./../utils/logging.js');
const fieldValidation = require('./fieldValidation.js');
const appHelper = require('./../helpers.js');
const github = require('./../services/github.js');

const favourite = {
    getFavouriteList:(req,res) => {
        helpers.getFavouriteList(db)
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
                return helpers.getUserFavouriteList(req.query.userId,db)
            }).then((getUserFavouriteList) => {
                return helpers.getDescription(getUserFavouriteList)
            }).then((getDescription) => {
                logger.trace("Successfully get list",getDescription);
                return responseFunction.sendSuccess("Successfully get list",res,getDescription);
            }).catch((err) => {
                logger.trace("Error in fetching the list",err);
                return responseFunction.sendError(err,res);
            })
    },
    getGists:(req,res) => {
        github.getAllPublicRepo(req.query)
        .then((getGists) => {
                let gists = [];
                getGists.forEach((gist) =>{
                    gists.push({id:gist.id,description:gist.description,url:gist.url});
                });
                return responseFunction.sendSuccess("Successfully get list",res,gists);
            }).catch((err) => {
                logger.trace("Error in fetching gists",err);
                return responseFunction.sendError("Error in fetching gists",err);
            })
    },
    addGists:(req,res) => {
        fieldValidation.addGists(req.body)
            .then((fieldValidationResult) => {
                return helpers.addIntoGistsList(req.body.userId, req.body.repoId,req.body.description)
            }).then((getFavouriteList) => {
                logger.trace("Successfully added gists",getFavouriteList);
                github.addFavouriteGists(req.body.repoId);
                return responseFunction.sendSuccess("Successfully added favourite",res,{});
            }).catch((err) => {
                logger.trace("Error in adding the gists",err);
                return responseFunction.sendError(err,res);
            })
    },
    getUsersGists:(req,res) => {
        fieldValidation.getUsersGists(req.query)
            .then((fieldValidation) => {
                return helpers.getUserGists(req.query.userId,db)
            }).then((getUserGists) => {
                logger.trace("Successfully get list",getUserGists);
                return responseFunction.sendSuccess("Successfully get list",res,getUserGists[0].gistsList);
            }).catch((err) => {
                logger.trace("Error in fetching the list",err);
                return responseFunction.sendError(err,res);
            })
    },

};

module.exports = favourite;