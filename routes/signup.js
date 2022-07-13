const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');

router.get('/', signupController.sign_up_get);

router.post('/', signupController.sign_up_post);

module.exports = router;
