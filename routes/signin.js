const express = require('express');
const router = express.Router();
const signinController = require('../controllers/signinController');

router.post('/', signinController.sign_in_post);

module.exports = router;
