var router = require('express').Router();
var controllerIndex = require('../controller/index');

router.get('/getemployeelist',controllerIndex.employee.getList)
router.get('/getemployee/:empno',controllerIndex.employee.get)
router.post('/addemployee',controllerIndex.employee.add)
router.post('/updateemployee',controllerIndex.employee.update)
router.delete('/deleteemployee',controllerIndex.employee.deleteemployee)

module.exports = router;