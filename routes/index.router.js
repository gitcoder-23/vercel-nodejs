const express = require('express');
const router = express.Router();




const userController = require('../controllers/users/users.controller');
router.get('/api/user/linkedInData', userController.linkedInData);


module.exports = router;