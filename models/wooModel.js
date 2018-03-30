'use strict';

const mongoose = require('mongoose');

// this is our schema to represent a restaurant
const blogSchema = new mongoose.Schema({
  title: {type: String, required: true},
  entry: {type: String, required: true},
  author: {type: String, required: true},
  postDate:{type: Date, default: Date.now()} 
});

// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
blogSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    entry: this.entry,
    author: this.author,
    postDate: this.postDate,
  };
}

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const Blog_Posts = mongoose.model('blog_posts', blogSchema);

module.exports = {Blog_Posts};