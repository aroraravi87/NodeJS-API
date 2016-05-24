
var employeeRouter =  require('./employeeRouter');
var IndexController = require('../controller/index')
module.exports = function(app){
    app.use('/employee',employeeRouter);
    app.use('/signup',IndexController.auth.signup);
    app.use('/login',IndexController.auth.login);
};