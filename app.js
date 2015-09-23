var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
var routes = require('./routes');
var bodyParser = require('body-parser');
var socketio = require('socket.io');


var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use('/', routes);
app.use(morgan('tiny'));

swig.renderFile(__dirname + '/views/index.html', people, function(err, output) {
  //console.log(output);
});

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });

// router.get('/', function (req, res) {
//   res.render('index', people);
// });
//





// router.get('/', function(req, res) {
//   res.send("Homepage");
// });
//
// router.get('/news', function(req, res) {
//   res.send("News Page");
// });


var server = app.listen(3000);
var io = socketio.listen(server);
