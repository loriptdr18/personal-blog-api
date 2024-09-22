// Import Mongoose to define the schema and interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({
  // 'username' field: A string that must be unique for each user and is required
  username: { type: String, required: true, unique: true },

  // 'email' field: A string representing the user's email, which must be unique and is required
  email: { type: String, required: true, unique: true },

  // 'password' field: A string that stores the user's hashed password, and is required
  password: { type: String, required: true },
});

// Export the User model, which uses the 'userSchema'
module.exports = mongoose.model('User', userSchema);
