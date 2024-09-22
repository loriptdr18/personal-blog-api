// Import bcryptjs for password hashing and comparison
const bcrypt = require('bcryptjs');

// Function to hash a password using bcrypt
exports.hashPassword = async (password) => {
  // Generate a salt with 10 rounds of processing (default is 10)
  const salt = await bcrypt.genSalt(10);
  
  // Hash the password with the generated salt and return the hashed password
  return await bcrypt.hash(password, salt);
};

// Function to compare a plain text password with a hashed password
exports.comparePassword = async (password, hashedPassword) => {
  // Compare the plain text password with the hashed password and return true or false
  return await bcrypt.compare(password, hashedPassword);
};
