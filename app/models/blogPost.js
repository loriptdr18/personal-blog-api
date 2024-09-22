// Import Mongoose to define the schema and interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for a blog post
const blogPostSchema = new mongoose.Schema({
  // 'title' field: A string, required for every blog post
  title: { type: String, required: true },

  // 'content' field: A string to store the content of the blog post, required
  content: { type: String, required: true },

  // 'author' field: References the User model; stores the author's ObjectId (foreign key relationship)
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // 'createdAt' field: Date when the blog post was created, defaults to the current date and time
  createdAt: { type: Date, default: Date.now },

  // 'updatedAt' field: Date when the blog post was last updated, defaults to the current date and time
  updatedAt: { type: Date, default: Date.now },
});

// Export the BlogPost model, which uses the 'blogPostSchema'
module.exports = mongoose.model('BlogPost', blogPostSchema);
