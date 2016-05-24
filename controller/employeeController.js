var employeeModel = require('../model/employeeModel')
var httpMsgs = require('../core/httpMsgs')


/**
 * get list of employees
 * @param {Object} req - express request.
 * @param {Object} res - express response
 */
exports.getList = function(req,res){
    employeeModel.getList(req,function(err,result){
        if(err){
            httpMsgs.show500Msg(req,res,err);
        }
        else{
           httpMsgs.show200Msg(req,res);
           httpMsgs.sendJson(req,res,{data :"success"});
        }
    });
};
/**
 * get employee
 * @param {Object} req - express request.
 * @param {Object} res - express response
 */
exports.get = function(req,res){
    employeeModel.get(req,function(err,data){
        if(err){
            httpMsgs.show500Msg(req,res,err);
        }
        else{
            httpMsgs.show200Msg(req,res);
            httpMsgs.sendJson(req,res,{data :"success"});
        }
    });
};

/**
 * add employee
 * @param {Object} req - express request.
 * @param {Object} res - express response
 */
exports.add = function(req,res){
    employeeModel.add(req,function(err,data){
        if(err){
            httpMsgs.show500Msg(req,res,err);
        }
        else{
             httpMsgs.show200Msg(req,res);
             httpMsgs.sendJson(req,res,{data :"success"});
        }
    });
};

/**
 * update employee
 * @param {Object} req - express request.
 * @param {Object} res - express response
 */
exports.update = function(req,res){
    employeeModel.update(req,function(err,data){
       if(err){
            httpMsgs.show500Msg(req,res,err);
        }
        else{
             httpMsgs.show200Msg(req,res);
            httpMsgs.sendJson(req,res,{data :"success"});
        }
    });
};
/**
 * delete employee
 * @param {Object} req - express request.
 * @param {Object} res - express response
 */
exports.deleteemployee = function(req,res){
    employeeModel.deleteemployee(req,function(err,data){
        if(err){
            httpMsgs.show500Msg(req,res,err);
        }
        else{
             httpMsgs.show200Msg(req,res);
             httpMsgs.sendJson(req,res,{data :"success"});
        }
    });
}