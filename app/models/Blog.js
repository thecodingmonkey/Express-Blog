var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var blogSchema = new Schema({

  timestamp: Date,

  author: String,
  title: String,
  body: String,

  url: Array,

});

Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;