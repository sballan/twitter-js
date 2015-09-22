var express = require('express');

var app = express();
var router = express.Router();

router.get('/', function(req, res) {
  res.send("Homepage");
});

router.get('/news', function(req, res) {
  res.send("News Page");
});








app.use(router);

app.listen(3000);
