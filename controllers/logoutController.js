const passport = require('passport');
const express = require('express');

exports.sign_out_get = (req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err);
    })
    res.redirect('/');
}