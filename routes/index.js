var express = require('express');
var router = express.Router();
var path = require('path');
var tweetBank = require('../tweetBank');
var bodyParser = require('body-parser');
var socketio = require('socket.io');


module.exports = function(io) {
  router.get('/', function(req, res, next) {
    res.json(tweetbank.list());
  });

  //make a tweet
  router.post('/', function(req, res, next) {
    res.status(201).json(tweetbank.add(req.body.name, req.body.tweet));
  });

  //get all tweets from user
  router.get('/users/:name', function(req, res, next) {
    var tweets = tweetbank.find(req.params);
    res.json(tweets);
  });

  //get single tweet
  router.get('/users/:name/tweets/:id', function(req, res, next) {
    req.params.id = Number(req.params.id);
    var tweets = tweetbank.find(req.params);
    res.json(tweets[0]);
  });


  return router;
};
