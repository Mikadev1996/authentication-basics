const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require('./models/user');
const signUpRouter = require('./routes/signup');
const signInRouter = require('./routes/signin');
const logoutRouter = require('./routes/logout');

const myMongoDB = "mongodb+srv://mika:mika@cluster0.ntegc.mongodb.net/auth-basics?retryWrites=true&w=majority";
mongoose.connect(myMongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', () => { console.error.bind(console, 'MongoDB connection error') });

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({username: username}, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false, { message: "Incorrect Username"});
            if (user.password !== password) return done(null, false, { message: "Incorrect Password"});

            return done(null, user);
        })
    })
)

passport.serializeUser(function(user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    })
})

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.render('index', {
    title: 'Express App!',
    user: req.user
}))
app.use('/sign-up', signUpRouter);
app.use('/log-in', signInRouter);
app.use('/log-out', logoutRouter);
// app.post('/log-in',
//     passport.authenticate("local", {
//         successRedirect: '/',
//         failureRedirect: '/'
//     })
// )


module.exports = app;
