const jwt = require('jsonwebtoken');

const config = require('./config/index.js');
const responseMessage = require('./utils/responsefunction.js');
const logger = require('./utils/logging.js');

const helpers = {
	validateToken:(req,res,next) => {
        jwt.verify(req.headers.token,config.secret,function(err,result){
        	console.log("err",err);
        	console.log("result",result);
            if(err || !result){
                logger.trace("Wrong token",err);
                return responseMessage.sendError("Please provide valid token",res);
            }
            console.log("req.method",req.method); 
            if(req.method == "POST" || req.method == "PUT"){
            	req.body.userId = result.uuid;
            }
            else{
            	req.query.userId = result.uuid;
            }
            next();
        })
	}
}

module.exports = helpers;