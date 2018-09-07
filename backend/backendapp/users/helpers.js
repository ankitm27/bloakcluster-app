const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const config = require('./../config/index.js');

const users = {
    saveInDb: (userId, email, password) => {
        return new Promise((resolve, reject) => {
            const userDetails = db.get('userDetails');
            userDetails.insert({
                userId: userId,
                email: email,
                password: password
            }, (err, result) => {
                if (err || !result) {
                    return reject({type: "SE", msg: "Please try after some time"});
                }
                return resolve(result);
            })
        })
    },
    checkEmailIsPresent: (email) => {
        return new Promise((resolve, reject) => {
            const userDetails = db.get("userDetails");
            userDetails.count({
                email: email
            }, (err, result) => {
                if (err) {
                    return reject({type: "SE", msg: "Please try again after some time"});
                }
                if (result > 0) {
                    return reject({type: "WDP", msg: "Email is already registered"});
                }
                return resolve(result);
            })
        })
    },
    findUserDocuments: (email) => {
        return new Promise((resolve, reject) => {
            const userDetails = db.get('userDetails');
            userDetails.findOne({
                email: email,
            }, (err, result) => {
                if (err || !result) {
                    return reject({type: "WDG", msg: "Email is not present"});
                }
                return resolve(result);
            })
        })
    },
    validatePassword: (email, uuid, password, hashPassword) => {
        return new Promise((resolve,reject) => {
            if (bcrypt.compareSync(password, hashPassword)) {
                var token = jwt.sign({
                    email: email,
                    uuid:uuid }, config.secret);
                return resolve(token)
            } else {
                return reject({type:"WDG",msg:"Please provide valid password"});
            }
        })
    }
};

module.exports = users;