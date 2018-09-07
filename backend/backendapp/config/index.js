const  _ = require("underscore");
const  config = require("./" + (process.env.NODE_ENV || "development") + ".js");
module.exports = _.extend({},config);