var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Blog = require('../models/Blog.js');

mongoose.connect('mongodb://devleague:devleague-user@ds049661.mongolab.com:49661/express-blog');

module.exports.controller = function(app) {
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
  app.put('/blog/:id', function (req, res) {
    // update existing blog post

    Blog.where({_id : req.params.id})
      .update(
        { $set: {
          author: req.body.author,
          title: req.body.title,
          body: req.body.body
          }
        }, function(err) {
          res.send('OK');
        }
      );

  });
  app.delete('/blog/:id', function (req, res) {
    // delete blog post
    Blog.remove( {
      _id : req.params.id,
      }, function(err) {
        res.send('OK');
      });
  });
  app.use(express.static('../../public/'));
}