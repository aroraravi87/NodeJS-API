var mssql =  require('mssql');
var config = require('config');

exports.executeSql = function(sql,callback){
    var connection = mssql.createConnection(config.get('dbConfig')).then(function(){
    connection.request.query(sql).then(function(err,data){
        if(err)
        callback(err);
        else
        callback(err,data);
    })    
    }).catch(function(err){});
    
    // connection.connect()
    // connection.query(sql,function(err,rows){
    //     if(!err){
    //         callback(rows);
    //     }
    //     else{
    //      console.log(err);
    //      callback(null,err);   
    //     }
    // });
//    connection.end();
    
}