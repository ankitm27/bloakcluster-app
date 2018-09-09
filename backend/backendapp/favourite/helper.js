"use strict";
const favourite = {
    getFavouriteList: () => {
        return new Promise((resolve, reject) => {
            const favouriteList = db.get('favouriteList');
            favouriteList.find({}, {_id: 0}, (err, result) => {
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
    getDescription:(userList) => {
        return new Promise((resolve,reject) => {
        favourite.getFavouriteList()
        .then((getFavouriteList) => {
            const repoList = userList[0].favouriteList;
            var desUserList = [];
            getFavouriteList.forEach((list) => {
                if(repoList.indexOf(list.repoName) > -1){
                   console.log("list",list); 
                   desUserList.push(list);
                }
            })
            return resolve(desUserList); 
        }).catch((err) => {
            return reject("there is some problem to fetech the result, Please try later");
        })
    })
}
};

module.exports = favourite;