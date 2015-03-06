var express = require('express');
var app = express();


app.set('view engine', 'jade');
app.get('/', function (req, res) {
  res.render('home');
});
app.get('/blog/:id', function (req, res) {
  res.render('blogpost', {id: req.params.id});
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