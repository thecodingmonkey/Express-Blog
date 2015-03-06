var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var livereload = require('connect-livereload');
var livereloadport = 35729;
var methodOverride = require('method-override');

app.set('views', path.join(__dirname, 'views'));
app.use(livereload({port: livereloadport}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('view engine', 'jade');
app.use(methodOverride('_method'));

mongoose.connect('mongodb://devleague:devleague-user@ds049661.mongolab.com:49661/express-blog');

var Schema = mongoose.Schema;

var blogSchema = new Schema({

  timestamp: Date,

  author: String,
  title: String,
  body: String,

  url: Array,

});

var Blog = mongoose.model('Blog', blogSchema);

app.get('/', function (req, res) {
  Blog.find( function(err, blogs) {
    if (err) throw err;

    console.log(blogs);

    res.render('home', {blogs: blogs} );
    
  });
});
app.get('/blog/:id', function (req, res) {
  Blog.find({_id: req.params.id}, function(err, blog) {
    res.render('curr_blog', {  
      blog: blog,
    });
  });

});
app.get('/new_blog', function (req, res) {
  res.render('new');
});
app.post('/blog', function (req, res) {
  var item = new Blog({
    timestamp: Date(),
    author: req.body.author,
    title: req.body.title,
    body: req.body.body,
    url: ['http://upload.wikimedia.org/wikipedia/commons/d/d7/Sad-pug.jpg',
    'https://lh6.ggpht.com/KPj0bTSZWXIDExtZjZiwQFGx7lswJvsp4wGFE9prO-r9wO5RIffpj0AjhPFDrn7mOa4=h900']
  });

  item.save(function(err) {
    if (err) throw err;

    res.send('OK');
  });
});
app.get('/blog/:id/edit', function (req, res) {
  // edit existing blog post

  Blog.find({_id: req.params.id}, function(err, blog) {
    res.render('edit', blog);
  });

});
app.use(express.static('public/'));



var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});