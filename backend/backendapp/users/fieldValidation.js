const Joi = require('joi');

const users = {
    signUp: (data) => {
        return new Promise((resolve, reject) => {
            const schema = Joi.object().keys({
                email:Joi.string().required(),
                password:Joi.string().required(),
                });
            const validateRequest = Joi.validate({
                email: data.email,
                password:data.password,
                }, schema);
            if (validateRequest.error) {
                return reject({status: "error", code:"FVF" , msg: "field validation failed"});
            }
            return resolve("success")
        })
    },
    login: (data) => {
        return new Promise((resolve, reject) => {
            const schema = Joi.object().keys({
                email:Joi.string().required(),
                password:Joi.string().required()
            });
            const validateRequest = Joi.validate({
                email: data.email,
                password:data.password
            }, schema);
            if (validateRequest.error) {
                return reject({status: "error", code:"FVF" , msg: "field validation failed"});
            }
            return resolve("success")
        })
    },
};

module.exports = users;
