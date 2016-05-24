
var db =require('../core/db');
var httpMsgs = require('../core/httpMsgs');
var uuid = require('node-uuid');
var mysql = require('mysql');

var session = {};
session.UpdateSessionId = function(email,callback){
    var user_sessionId = uuid.v1();
    var whereParameter = {
        user_email  : email
    }
    var sql = "UPDATE nodejs.user SET user_sessionid = '"+user_sessionId+"' WHERE ?";
    var sqlQuery = mysql.format(sql,whereParameter);
    db.executeSql(sqlQuery,function(data,err){
        if(err)
            callback(err);
        else
            callback(err,data);
    });
};
module.exports = session;



