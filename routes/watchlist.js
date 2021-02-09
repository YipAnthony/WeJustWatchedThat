var express = require('express');
var router = express.Router();

/* GET watchlist. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// POST watchlist: add's to watchlist
router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});

// DELETE item from watchlist: 
router.delete('/:id', function(req, res, next) {
  
    // get watchlist

    // find item in watchlist and delete
});


module.exports = router;
