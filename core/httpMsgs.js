var config = require('config');

exports.show500Msg = function(req,res,err){
    if(config.get("httpMsgs") == "HTML"){
        res.writeHead(500,"Internl server error",{'Content-Type':'text/html'});
        res.write('<html><hrad><title>Internal server error</title></head><body>Internal server error and error is:'+err+'</body></html>');
    }
    else{
         res.writeHead(500,"Internal server error",{'Content-Type':'application/json'});
         res.write(JSON.stringify({data :"error is:"+err}));
    }
    res.end();
}
exports.sendJson = function(req,res,data){
     if(data){
        res.write(JSON.stringify(data));
     }
     res.end();
}

exports.show405Msg = function(req,res){
    if(config.get("httpMsgs") == "HTML"){
        res.writeHead(405,"Method not supported",{'Content-Type':'text/html'});
        res.write('<html><hrad><title>Method not supported</title></head><body>Method not supported</body></html>');
    }
    else{
         res.writeHead(405,"Method not supported",{'Content-Type':'application/json'});
         res.write(JSON.stringify({data :"Error occured is: Method not supported"}));
    }
    res.end();
}

exports.show404Msg = function(req,res){
    if(config.get("httpMsgs") == "HTML"){
        res.writeHead(404,"Resource not found",{'Content-Type':'text/html'});
        res.write('<html><hrad><title>Resource not found</title></head><body>Resource not found</body></html>');
    }
    else{
         res.writeHead(404,"Resource not found",{'Content-Type':'application/json'});
         res.write(JSON.stringify({data :"Error occured is: Resource not found"}));
    }
    res.end();
}

exports.show413Msg = function(req,res){
    if(config.get("httpMsgs") == "HTML"){
        res.writeHead(405,"Resource not found",{'Content-Type':'text/html'});
        res.write('<html><hrad><title>Resource not found</title></head><body>Resource not found</body></html>');
    }
    else{
         res.writeHead(405,"Resource not found",{'Content-Type':'application/json'});
         res.write(JSON.stringify({data :"Error occured is: Resource not found"}));
    }
    res.end();
}

exports.show200Msg = function(req,res){
     res.writeHead(200,{'Content-Type':'application/json'});
}

exports.showHomePage = function(req,res){
     if(config.get("httpMsgs") == "HTML"){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<html><hrad><title>Home Page</title></head><body>Valid endpoints are:<br/> /employees - GET To List of All Employees /employees/<empno> - GET To search of employee</body></html>');
    }
    else{
         res.writeHead(200,{'Content-Type':'application/json'});
         res.write(JSON.stringify([
              {url :"/employees", method : "GET", description : "To list of all employees"},
              {url :"/employees/<empno>", method : "GET", description : "To search of all employee"}
              ]));
    }
    res.end();
}