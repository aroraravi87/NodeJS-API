var db =require('../core/db');
var httpMsgs = require('../core/httpMsgs');
var uuid = require('node-uuid');
var mysql = require('mysql');

var authHelper = {};

authHelper.ValidateEmail = function(email,callback){
    var sql = "SELECT COUNT(user_email) As emailCount from nodejs.user WHERE user_email = ?";
    var sqlQuery = mysql.format(sql, email);
    db.executeSql(sqlQuery, function(data,err){
      if(err)
        callback(err);
      else{
        callback(err,data)
      }
  })
    
};

authHelper.CheckLogin = function(email,callback){
    var sql = "SELECT * from nodejs.user WHERE user_email = ?";
    var sqlQuery = mysql.format(sql, email);
    db.executeSql(sqlQuery, function(data,err){
      if(err)
        callback(err);
      else{
        callback(err,data)
      }
  })
};

module.exports = authHelper;

