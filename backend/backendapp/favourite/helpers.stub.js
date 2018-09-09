module.exports = {
    getFavouriteList: {
        success: [{"repoName":"abc","description":"repo for abc"},{"repoName":"efg","description":"repo for efg"}],
        notPresent:{code: "DNP", msg: "Data is not present"},
        errorReq:{code: "SE", msg: "Please try after some time"}
    },
    getFavourite:{
    	success:[{"repoName":"abc","description":"repo for abc"},{"repoName":"efg","description":"repo for efg"}],
    	notPresent:{code: "DNP", msg: "Data is not present"},
    	errorReq:{code: "SE", msg: "Please try after some time"}
    }
};