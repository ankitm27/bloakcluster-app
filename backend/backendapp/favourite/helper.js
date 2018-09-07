const favourite = {
    getFavouriteList: () => {
        return new Promise((resolve, reject) => {
            const favouriteList = db.get('favouriteList');
            favouriteList.find({}, {_id: 0}, (err, result) => {
                console.log("err", err);
                console.log("result", result);
                if (err) {
                    return reject({code: "SE", msg: "Please try after some time"});
                }
                if (result.length == 0) {
                    return reject({code: "DNP", msg: "Data is not present"});
                }
                return resolve(result);
            })
        })
    },
    addIntoFavouriteList: (userId, repoName) => {
        return new Promise((resolve, reject) => {
            const favouriteList = db.get('userFavouriteList');
            favouriteList.findOneAndUpdate({
                userId: userId
            }, {
                $addToSet: {favouriteList: repoName}
            }, {upsert: true}, (err, result) => {
                if (err) {
                    return reject({code: "SE", msg: "Please try after some time"});
                }
                return resolve(result);
            })
        })
    },
    getUserFavouriteList: (userId) => {
        return new Promise((resolve, reject) => {
            const favouriteList = db.get('userFavouriteList');
            favouriteList.find({userId:userId}, {_id: 0}, (err, result) => {
                if (err) {
                    return reject({code: "SE", msg: "Please try after some time"});
                }
                if (result.length == 0) {
                    return reject({code: "DNP", msg: "Data is not present"});
                }
                return resolve(result);
            })
        })
    },
};

module.exports = favourite;