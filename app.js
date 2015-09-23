var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
var routes = require('./routes');
var bodyParser = require('body-parser');
var socketio = require('socket.io');



var app = express();
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
