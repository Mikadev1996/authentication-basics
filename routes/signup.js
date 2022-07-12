const express = require('express');
const router = express.Router();
const User = require('../models/user')

/* GET home page. */
router.get('/', function(req, res) {
    res.render('sign-up-form', { title: 'Sign Up' });
});

router.post('/', (req, res, next) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    }).save(err => {
        if (err) return next(err);
        res.redirect('/');
    })
})

module.exports = router;
