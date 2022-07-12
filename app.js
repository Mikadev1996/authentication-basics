const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const signUpRouter = require('./routes/signup');

const myMongoDB = "mongodb+srv://mika:mika@cluster0.ntegc.mongodb.net/auth-basics?retryWrites=true&w=majority";
mongoose.connect(myMongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', () => { console.error.bind(console, 'MongoDB connection error') });

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.render('index', {title: 'Express App!!'}))
app.use('/sign-up', signUpRouter);

module.exports = app;
