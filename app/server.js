var express = require('express');
var app = express();
var path = require('path');
var router = require('./controllers/blogs.js');
var bodyParser = require('body-parser');
var livereload = require('connect-livereload');
var livereloadport = 35729;
var methodOverride = require('method-override');

app.set('views', path.join(__dirname, 'views'));
app.use(livereload({port: livereloadport}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('view engine', 'jade');
app.use(methodOverride('_method'));
app.use(express.static('public/'));

app.use('/', router);

var Blog;

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});