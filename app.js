var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

const User = require('./models/User')

// User Authentication imports
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const FacebookStrategy = require("passport-facebook").Strategy

var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var sessionRouter = require('./routes/session');

var app = express();
app.set('view engine', 'ejs');
//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors())
app.use(session({ secret: "movieSecretes", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.use(express.urlencoded({ extended: false }));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3003/login/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'emails']
}, function (accessToken, refreshToken, profile, done) {
  User.findOne({facebook_id: profile.id}, (err, oldUser) => {
    if (err) throw err;
    
    if (oldUser) {
      done(null, oldUser);
    } else {
      const displayNameArray = profile.displayName.split(" ")
      const firstName = displayNameArray[0] ? displayNameArray[0] : null
      const lastName = displayNameArray[1] ? displayNameArray[1] : null
      const newUser = new User({
        facebook_id: profile.id,
        firstName: firstName,
        lastName: lastName,
        email: profile.emails[0].value,
        history: [],
        watchList: []
      })
      newUser.save( (err, newUser) => {
        if (err) throw err;
        done (null, newUser)
      })
    }
  })
}
))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.use('/users', usersRouter);
app.use('/session', sessionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err)
});

module.exports = app;
