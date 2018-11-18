var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;
app.listen(port);

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');