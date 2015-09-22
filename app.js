var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
var people =  {
    title: 'homepage',
    people: {
      jane:{
        name: "Jane Doe"
      },
      tom:{
        name: "Tom J"
      },
      chris:{
        name: "Chris Q"
      }
    }
  };

var app = express();
var router = express.Router();

swig.renderFile(__dirname + '/views/index.html', people, function(err, output) {
  console.log(output);
});

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });

router.get('/', function (req, res) {
  res.render('index', people);
});




app.use(morgan('tiny'));

// router.get('/', function(req, res) {
//   res.send("Homepage");
// });

router.get('/news', function(req, res) {
  res.send("News Page");
});



app.use(router);

app.listen(3000);
