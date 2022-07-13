const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');

router.get('/', logoutController.sign_out_get);

module.exports = router;
