var express = require('express');
var router = express.Router();
var path = require('path');
var tweetBank = require('../tweetBank');
var bodyParser = require('body-parser');
var socketio = require('socket.io');


module.exports = function(io) {
  router.get('/', function(req, res) {
    var filePath = req.path;

    var tweets = tweetBank.list();
    res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true} );
  });

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var tweets = tweetBank.find({name: name});
    res.render('index', { title: 'Twitter.js - Posts by ' + name, tweets: tweets, name: name, showForm: true });
  });

  router.get('/users/:name/tweets/:id', function(req, res) {
    var name = req.params.name;
    var id = Number(req.params.id);
    var tweet = tweetBank.find({id: id});
    console.log(tweet);
    res.render('index', { title: 'Twitter.js - Tweet by ' + name, tweets: tweet });

  });

  router.post('/submit', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    io.sockets.emit('new_tweet', { name: name, text: text,});
    res.redirect('/');
  });

  return router;
};
