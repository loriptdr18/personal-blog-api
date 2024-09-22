// Import the User model to interact with the 'User' collection in MongoDB
const User = require('../models/user');

// Import the custom encryption middleware for password hashing and comparison
const encrypt = require('../middleware/encrypt');

// Import the custom token middleware to generate authentication tokens
const token = require('../middleware/token');

// Controller to handle user registration
exports.registerUser = async (req, res) => {
  try {
    // Destructure the username, email, and password from the request body
    const { username, email, password } = req.body;

    // Check if a user with the same email already exists
    let user = await User.findOne({ email });
    if (user) {
      // If the user already exists, return a 400 (Bad Request) response with a message
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password using the custom encryption middleware
    const hashedPassword = await encrypt.hashPassword(password);

    // Create a new user with the provided username, email, and hashed password
    user = new User({ username, email, password: hashedPassword });

    // Save the new user to the database
    await user.save();

    // Generate a token for the user using the custom token middleware
    const userToken = token.generateToken(user.id);

    // Return the token as a JSON response
    res.json({ token: userToken });
  } catch (err) {
    // Log any error that occurs and send a 500 (Server Error) response
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Controller to handle user login
exports.loginUser = async (req, res) => {
  try {
    // Destructure the email and password from the request body
    const { email, password } = req.body;

    // Check if a user with the provided email exists
    let user = await User.findOne({ email });
    if (!user) {
      // If no user is found, return a 400 (Bad Request) response with a message
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await encrypt.comparePassword(password, user.password);
    if (!isMatch) {
      // If the passwords do not match, return a 400 (Bad Request) response with a message
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a token for the user if the credentials are valid
    const userToken = token.generateToken(user.id);

    // Return the token as a JSON response
    res.json({ token: userToken });
  } catch (err) {
    // Log any error that occurs and send a 500 (Server Error) response
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
