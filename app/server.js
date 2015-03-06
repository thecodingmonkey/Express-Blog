var express = require('express');
var app = express();
var path = require('path');
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


app.get('/', function (req, res) {
  res.render('home');
});
app.get('/blog/:id', function (req, res) {
  res.render('edit', {id: req.params.id});
});
app.get('/new_blog', function (req, res) {
  res.render('new');
});
app.post('/blog', function (req, res) {
  // create new blog post
});
app.get('/blog/:id/edit', function (req, res) {
  // edit existing blog post
});
app.put('/blog/:id', function (req, res) {
  // update existing blog post
});
app.get('/blog', function (req, res) {
  // delete blog post
});



var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});