const Joi = require('joi');

const favourite = {
    addFavourite: (data) => {
        return new Promise((resolve, reject) => {
            const schema = Joi.object().keys({
                userId:Joi.string().required(),
                repoName:Joi.string().required()
            });
            const validateRequest = Joi.validate({
                userId: data.userId,
                repoName:data.repoName
            }, schema);
            if (validateRequest.error) {
                return reject({status: "error", code:"FVF" , msg: "field validation failed"});
            }
            return resolve("success")
        })
    },
    getUsersFavourite: (data) => {
        return new Promise((resolve, reject) => {
            const schema = Joi.object().keys({
                userId:Joi.string().required(),
            });
            const validateRequest = Joi.validate({
                userId: data.userId,
            }, schema);
            if (validateRequest.error) {
                return reject({status: "error", code:"FVF" , msg: "field validation failed"});
            }
            return resolve("success")
        })
    },
};

module.exports = favourite;