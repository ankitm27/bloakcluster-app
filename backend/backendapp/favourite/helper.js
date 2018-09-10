"use strict";
const favourite = {
    getFavouriteList: (db) => {
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
    getUserFavouriteList: (userId,db) => {
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
        favourite.getFavouriteList(db)
        .then((getFavouriteList) => {
            const repoList = userList[0].favouriteList;
            var desUserList = [];
            getFavouriteList.forEach((list) => {
                if(repoList.indexOf(list.repoName) > -1){
                   desUserList.push(list);
                }
            })
            return resolve(desUserList); 
        }).catch((err) => {
            return reject("there is some problem to fetech the result, Please try later");
        })
    })
},
    addIntoGistsList: (userId, repoId,description) => {
        return new Promise((resolve, reject) => {
            const list = {"repoId":repoId,"description":description};
            const favouriteList = db.get('userFavouriteList');
            favouriteList.findOneAndUpdate({
                userId: userId
            }, {
                $addToSet: {gistsList: list}
            }, {upsert: true}, (err, result) => {
                if (err) {
                    console.log("err",err);
                    return reject({code: "SE", msg: "Please try after some time"});
                }
                console.log("result",result);
                return resolve(result);
            })
        })
    },
    getUserGists: (userId,db) => {
        return new Promise((resolve, reject) => {
            const favouriteList = db.get('userFavouriteList');
            favouriteList.find({userId:userId}, {_id: 0,gistsList:1}, (err, result) => {
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