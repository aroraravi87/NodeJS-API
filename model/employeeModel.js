var db =require('../core/db');
var httpMsgs = require('../core/httpMsgs');
var Check = require('../lib/Check');
var util = require('util');
var appUtil = require('../lib/appUtils');
var mysql = require('mysql');
var employeeModel = {};

employeeModel.getList = function(req,callback){
    db.executeSql("Select * From nodejs.employee",function(data,err){
        if(err){
            callback(err);
        }
        else{
            callback(err,data);
        }
    })
}

employeeModel.get = function(req,callback){
    db.executeSql("Select * From nodejs.employee Where employee_id="+req.params.empno,function(data,err){
        if(err){
            callback(err);
        }
        else{
            callback(err,data);
        }
    })   
}

employeeModel.add = function(req,callback){
    var rule ={
        employeeName : Check.that(req.body.employee_name).isNotEmptyOrBlank(),
        employeeSalary : Check.that(req.body.employee_salary).isNotEmptyOrBlank()
    }
    appUtil.validateChecks(rule,function(err,result){
        if(err)
            callback(err);
        else{
            var parameter = {
                employee_name:req.body.employee_name,
                employee_salary:req.body.employee_salary
            }
            var sql = "INSERT INTO nodejs.employee ?"
            var sqlQuery = mysql.format(sql,parameter);
            db.executeSql(sqlQuery,function(data,err){
            if(err){
                callback(err);
            }
            else{
                callback(err,data);
            }
            });
        }
    });
}

employeeModel.update = function(req,callback){
    var rule = {
        employeeid : Check.that(req.body.employee_id).isNotEmptyOrBlank()
    }
    appUtil.validateChecks(rule,function(err,result){
        if(err)
            callback(err);
        else{
            var isDataProvided = false;
            var sql = "UPDATE nodejs.employee SET"
            if(req.body.employee_name){
                sql += " employee_name='"+req.body.employee_name+"',";
                isDataProvided = true;
            }
            if(req.body.employee_salary){
                sql += " employee_salary='"+req.body.employee_salary+"',";
                isDataProvided = true;
            }
            sql = sql.slice(0,-1);
            sql += " WHERE employee_id = "+ req.body.employee_id;
            db.executeSql(sql,function(data,err){
                if(err){
                    callback(err);
                }
                else{
                    callback(err,data);
                }
            });
        }
    });
 }

employeeModel.deleteemployee=function(req,callback) {

    var rule = {
        employeeid : Check.that(req.body.employee_id).isNotEmptyOrBlank()
    }
    appUtil.validateChecks(rule,function(err,result){
            if(err)
                callback(err);
            else{
                var sql = "DELETE FROM nodejs.employee WHERE employee_id = " + req.body.employee_id;
                db.executeSql(sql,function(data,err){
                    if(err){
                        callback(err);
                    }
                    else{
                        callback(err,data);
                    }
                });
             }
        });
}

module.exports = employeeModel