var db =require('../core/db');
var httpMsgs = require('../core/httpMsgs');
var Check = require('../lib/Check');
var util = require('util');
var appUtil = require('../lib/appUtils');
var authHelper = require('../helper/authHelper');
var sessionHelper = require('../helper/sessionHelper');
var setting = require('../assets/setting');
var mySql = require('mysql');
var md5 = require('md5');
var uuid = require('node-uuid');
var userModel = {};

/**
 * check the user name and save 
 * @param {Object} req - express request.
 * @param {Callback} res - call back function
 */
userModel.signup = function(req, callback){
    var rule = {
        email : Check.that(req.body.user_email).isNotEmptyOrBlank().isEmail(),
        userfirstname: Check.that(req.body.user_firstname).isNotEmptyOrBlank(),
        userlastname: Check.that(req.body.user_lastname).isNotEmptyOrBlank(),
        userphonenumber: Check.that(req.body. user_phone).isNotEmptyOrBlank(),
        user_password :Check.that(req.body.user_password).isNotEmptyOrBlank()    
    };
    appUtil.validateChecks(rule,function(err,data){
        if(err)
            callback(err);
        else{
            authHelper.ValidateEmail(req.body.user_email,function(err,data){
                if(err)
                    callback(err);
                else{
                    if(data[0].emailCount >= 1){
                        callback(setting.USER_ALREADY_EXISTS);
                    }
                    else{
                        var password =md5(req.body.user_password);
                        var sessionId = uuid.v1(); 
                        var post={
                            user_firstname :req.body.user_firstname,
                            user_lastname: req.body.user_lastname,
                            user_email: req.body.user_email,
                            user_phone: req.body.user_phone,
                            user_createddate : new Date(),
                            user_lastUpdateddate : new Date(),
                            user_password : password,
                            user_sessionid :sessionId 
                        };
                         var sql = "INSERT INTO nodejs.user SET ?";
                         var sqlQuery = mySql.format(sql,post);
                         db.executeSql(sqlQuery,function(data,err){
                            if(err){
                                callback(err);
                            }
                            else{
                                callback(err,data);
                            }
                       });
                    }
                }
            });      
         }
    });
};

userModel.login = function(req,callback){
    var rule = {
        email : Check.that(req.body.user_email).isNotEmptyOrBlank().isEmail(),
        password :Check.that(req.body.user_password).isNotEmptyOrBlank()        
    };
    appUtil.validateChecks(rule,function(err,data){
         if(err)
            callback(err);
         else{  
             authHelper.ValidateEmail(req.body.user_email,function(err,data){
                if(err)
                    callback(err);
                else{
                    if(data[0].emailCount >= 1){     
                    authHelper.CheckLogin(req.body.user_email,function(err,data){
                        if(err)
                            callback(err);
                        else{
                            var hashPassword =  md5(req.body.user_password);
                            if(data[0].user_email == req.body.user_email && hashPassword == data[0].user_password){
                                sessionHelper.UpdateSessionId(req.body.user_email,function(err,data){
                                    if(err)
                                        callback(err);
                                    else{
                                        authHelper.CheckLogin(req.body.user_email,function(err,data){
                                            if(err)
                                                callback(err);
                                            else{
                                                var responseData ={
                                                    user_firstname: data[0].user_firstname,
                                                    user_lastname: data[0].user_lastname,
                                                    user_email :data[0].user_email,
                                                    user_phone : data[0].user_phone,
                                                    user_sessionid : data[0].user_sessionid
                                                }
                                            callback(err,responseData); 
                                            }
                                        });
                                    }
                                });
                            }
                            else{
                                callback(setting.USER_NOT_EXISTS);
                            }
                        }
                    });
                 }
                 else{
                     callback(setting.USER_NOT_EXISTS);
                 }
              }
           });
         }
    });
};

module.exports = userModel;