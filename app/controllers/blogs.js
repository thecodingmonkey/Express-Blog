var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Blog = require('../models/Blog.js');

mongoose.connect('mongodb://devleague:devleague-user@ds049661.mongolab.com:49661/express-blog');

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username);
    console.log(password);

    if (username === "Yukio" || username === "admin") {
      return done(null, username.toString() );
    }
    else {
      return done(null, false, {message: 'FAILLLLLL'});
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

function ensureAuthenticated(req, res, next) {
  // if (res.isAuthenticated()) { return next(); }
  if (req.user) { return next(); }

  console.log(req.user);
  res.redirect('/login');
}

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' })
);

router.authenticate = passport.authenticate('local', {
  successRedirect: 'blog/admin',
  failureRedirect: '/login'
});

router.get('/', ensureAuthenticated, function (req, res) {
  console.log('hi');

  Blog.find( function(err, blogs) {
    if (err) throw err;

    console.log(blogs);

    res.render('home', {blogs: blogs} );
    
  });
});
router.get('/blog/:id', function (req, res) {
  Blog.find({_id: req.params.id}, function(err, blog) {
    console.log(blog);
    res.render('curr_blog', {  
      blog: blog,
    });
  });

});
router.get('/new_blog', function (req, res) {
  res.render('new');
});
router.post('/blog', function (req, res) {
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
router.get('/blog/:id/edit', function (req, res) {
  // edit existing blog post

  Blog.find({_id: req.params.id}, function(err, blog) {
    res.render('edit', blog);
  });

});
router.put('/blog/:id', function (req, res) {
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
router.delete('/blog/:id', function (req, res) {
  // delete blog post
  Blog.remove( {
    _id : req.params.id,
    }, function(err) {
      res.send('OK');
    });
});

module.exports = router;