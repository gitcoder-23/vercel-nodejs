const express = require('express');
const router = express.Router();




const userController = require('../controllers/users/users.controller');
router.get('/api/user/linkedInData', userController.linkedInData);


const scheduleController = require('../controllers/users/schedules.controller');
router.get('/api/user/scheduleData', scheduleController.scheduleData);
router.get('/api/user/sampleFunction', scheduleController.sampleFunction);


module.exports = router;