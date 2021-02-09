var express = require('express');
const passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  
    // check if user logged in

    // if not, redirect to login/signup page
    res.send('This is the home page and you are logged in!')

    // if yes, do nothing? Front end should take auto load
});

/* GET home success. */
router.get('/success', function(req, res, next) {
  
    // check if user logged in

    // if not, redirect to login/signup page
    res.send('success')

    // if yes, do nothing? Front end should take auto load
});
/* GET home success. */
router.get('/fail', function(req, res, next) {
  
    // check if user logged in

    // if not, redirect to login/signup page
    res.send('succefailss')

    // if yes, do nothing? Front end should take auto load
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/login');
  }

module.exports = router;
