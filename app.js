var express = require('express');
var app = express();
var fs = require('fs');
var morgan = require('morgan');
var mime = require('mime');

var swig = require('swig');
var routes = require('./routes');
var bodyParser = require('body-parser');
var socketio = require('socket.io');

//static file middleware
app.use(function(req, res, next) {
  var mimeType = mime.lookup(req.path);
  fs.readFile('./public/' + req.path, function(err, fileBuffer) {
    if(err) return next();
    res.header('Content-Type', mimeType);
    res.send(fileBuffer);
  });
});


app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.use(morgan('tiny'));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });

var server = app.listen(3000);
var io = socketio.listen(server);
app.use('/', routes(io));
