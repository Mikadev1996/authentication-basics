const passport = require('passport');

exports.sign_in_post =  () => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
    })
}