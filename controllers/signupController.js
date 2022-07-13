const express = require('express');
const User = require("../models/user");

exports.sign_up_get = (req, res, next) => {
    res.render('sign-up-form', {
        title: 'Sign Up',
    })
}

exports.sign_up_post = (req, res, next) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    }).save(err => {
        if (err) return next(err);
        res.redirect('/');
    })
}