var express = require('express');
var router = express.Router();
var path = require('path')
var tweetBank = require('../tweetBank');

router.get('/', function(req, res) {
  var filePath = req.path;
  console.log(filePath);


  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets} );
});

// router.get('/stylesheets/style.css', function(req, res) {
//   res.sendFile(path.join(__dirname, '../public/stylesheets/style.css'));
//
// });

module.exports = router;
