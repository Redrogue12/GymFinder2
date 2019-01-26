var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
require('dotenv').config()

var app = express();

var port = process.env.PORT || 3000;
app.listen(port);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', function (req, res, next) {
  console.log('Request URL: ' + req.url);
  next();
});

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/search', urlencodedParser, function (req, res) {
  var API = process.env.GOOGLE_API
  var query = req.query.search;  
  var url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=gyms+in+${query}&key=${API}`;
  var source = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference="

  request(url, function(e, response, body) {
    if (!e && response.statusCode == 200) {
      var data = JSON.parse(body)      
      res.render('search', { data: data, api: API , source: source });
    }
  });
});