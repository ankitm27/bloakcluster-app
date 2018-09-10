const rp = require('request-promise');

const logger = require('./../utils/logging.js');

const github = {
    getAllPublicRepo: () => {
        return new Promise((resolve, reject) => {
            const options = {
                uri: 'https://api.github.com/gists/public',
                headers: {
                    'User-Agent': 'application/json'
                },
                qs: {
                    since: "2018-09-01"
                },
                json: true
            };
            rp(options)
                .then((result) => {
                    return resolve(result);
                })
                .catch((err) => {
                    return reject(err);
                });
        })
    },

    addFavouriteGists: (repoId) => {
        const options = {
            uri: 'https://api.github.com/gists/' + repoId + '/star',
            headers: {
                'User-Agent': 'application/json',
                'Content-Length': 0
            },
            method: "PUT",
            json: true
        };
        //rp(options)
        //    .then((result) => {
        //        logger.trace("Successfully gists on github",result);
        //    }).catch((err) => {
        //        logger.trace("There is some problem in adding gists on github",err);
        //    })
    }
};

module.exports = github;

