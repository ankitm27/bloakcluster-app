exports.sendError = function (err, res) {
    return res.status(200).send({success:false,message: err.msg, type: err.type });

};

exports.sendSuccess = function (successMsg, res,data) {
    return res.status(200).send({success:true,statusCode: 200, message: successMsg, data: data || {}});

};