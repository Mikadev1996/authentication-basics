const User = require("../models/user")
const bcrypt = require('bcryptjs');

exports.sign_up_get = (req, res, next) => {
    res.render('sign-up-form', {
        title: 'Sign Up',
    })
}

exports.sign_up_post = (req, res, next) => {
    bcrypt.hash(req.body.password, 5, (err, hashedPassword) => {
        if (err) return next(err);

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
        }).save(err => {
            if (err) return next(err);
            res.redirect('/');
        })
    })

}