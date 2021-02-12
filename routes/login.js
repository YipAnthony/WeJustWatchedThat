var express = require('express');
var router = express.Router();
var cors = require('cors');
const passport = require("passport")
const User = require('../models/User')

// POST login, might not need if using FB/google login
router.post('/',  cors(), function(req, res, next) {
  const profileID = req.body.id
  const displayName = req.body.name
  const email = req.body.email
  console.log(profileID, displayName, email)
  User.findOne({facebook_id: profileID}, (err, oldUser) => {
    if (err) return next(err);
    
    if (oldUser) {
      res.send("Welcome Back")
    } else {
      const displayNameArray = displayName.split(" ")
      const firstName = displayNameArray[0] ? displayNameArray[0] : null
      const lastName = displayNameArray[1] ? displayNameArray[1] : null
      const newUser = new User({
        facebook_id: profileID,
        firstName: firstName,
        lastName: lastName,
        email: email,
        history: [],
        watchList: []
      })
      newUser.save( (err, newUser) => {
        if (err) return next(err);
        res.send("New account created!")
      })
    }
  })
});

// GET facebook autherization 
router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));


// GET FB AUTH CALLBACK
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { 
      successRedirect: 'http://localhost:3000/',
      failureRedirect: '/home/fail' 
    }));
module.exports = router;
