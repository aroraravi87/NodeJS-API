var userModel = require('../model/userModel');
var httpMsgs = require('../core/httpMsgs')


/**
 * sign up the user
 * @param {Object} req - express request.
 * @param {Object} res - express response
 */
exports.signup = function(req,res){
    userModel.signup(req,function(err,data){
        if(err){
            httpMsgs.show500Msg(req,res,err);
        }
        else{
             httpMsgs.show200Msg(req,res);
             httpMsgs.sendJson(req,res,{data :"success"});
        }
    })
};

/**
 * login user
 * @param {Object} req - express request.
 * @param {Object} res - express response
 */
exports.login = function(req,res){
    userModel.login(req,function(err,data){
        if(err)
            httpMsgs.show500Msg(req,res,err);
        else{
            httpMsgs.show200Msg(req,res);
             httpMsgs.sendJson(req,res,data);
        }
    })
}