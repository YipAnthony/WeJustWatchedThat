var express = require('express');
var router = express.Router();
const passport = require("passport")

// POST login, might not need if using FB/google login
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) { 
    res.send ("you're already logged in")
  }
  res.send('this is the login page, you must not be logged in');
});

// GET facebook autherization 
router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));


// GET FB AUTH CALLBACK
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { 
      successRedirect: '/home/success',
      failureRedirect: '/home/fail' 
    }));
module.exports = router;
