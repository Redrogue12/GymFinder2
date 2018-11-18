var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;
app.listen(port);

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', function (req, res, next) {
  console.log('Request URL: ' + req.url);
  next();
});

app.get('/', function (req, res) {
  res.render('index');
});