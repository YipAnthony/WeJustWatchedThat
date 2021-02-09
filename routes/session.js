var express = require('express');
var router = express.Router();
const passport = require('passport');

/* POST session: creates a new session */
// this endpoint will be called when user clicks "create sharing link"
router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});



// GET session: 
router.get('/:id', (req, res, next) => {
  if (req.isAuthenticated()) {
    let user = req.session.passport.user
    res.send(`Hello ${user.displayName}, this is a session. And you're facebookID is ${user.id}`)
  }
    //id associated with session ID
    // need to include session ID into the redirect somehow
  res.redirect('/login')
})

module.exports = router;
