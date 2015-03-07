
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
