var express = require('express');
var router = express.Router();
const VotingSession = require('../models/VotingSession')
const User = require('../models/User')

function randomString(length = 4) {  
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/* POST session: creates a new session */
// this endpoint will be called when user clicks "create sharing link"
router.post('/', function(req, res, next) {

  //get movie results array from post body 
  const movieResults = req.body.movieResults 
  
  if (req.isAuthenticated()) {
    let user = req.session.passport.user

    User.findOne({facebook_id: user.id}, (err, currentUser) => {
      if (err) throw err;


      const newSession = new VotingSession({
        name: `${user.displayName}'s Session`,
        creator: currentUser._id,
        password: randomString(),
        creationDate: Date.now(),
        voteResults: [], // empty array, will be filled with objects. Objects
                    // will be pushed on when a voter has completed voting
                    // object contains userID and movies voted for
        movieOptions: [...movieResults]

      })

      newSession.save( (err, session) => {
        if (err) throw err;
        done (null, session)
        res.redirect('/session/voted') // send to finished voting page
      })
      
    })
  } else {
    res.send("you must be signed in to create a voting session")
  }


});

// GET: finished voting page
router.get('/voted', (req, res, next) => {
  res.send("You finished voting")
})

// GET session: 
router.get('/:id', (req, res, next) => {
  if (req.isAuthenticated()) {

    VotingSession.findById(req.params.id, (err, session) => {
      if (err) { return next(err) }
      
      //
      res.send(session.name)
    })
    let user = req.session.passport.user
    res.send(`Hello ${user.displayName}, this is a session. And you're facebookID is ${user.id}`)
  }
    //id associated with session ID
    // need to include session ID into the redirect somehow
  res.redirect('/login')
})

module.exports = router;
