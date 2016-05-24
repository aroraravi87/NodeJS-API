var express =  require('express');
var bodyParser = require('body-parser');
var config = require('config');
var db = require('./core/db');
var cors = require('cors');


var app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false

}));
var router = require('./route/index')(app);
var server = app.listen(config.get('portNumber'),function(){
   console.log("server is running on http://localhost:%s",server.address().port); 
});

module.exports = app;