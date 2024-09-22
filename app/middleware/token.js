// Import jsonwebtoken for token generation and verification
const jwt = require('jsonwebtoken');

// Function to generate a JWT for a given user ID
exports.generateToken = (userId) => {
  // Payload contains the user's ID
  const payload = { user: { id: userId } };

  // Sign the token with the payload and a secret key from environment variables
  return jwt.sign(payload, process.env.JWTSECRET);
};

// Function to verify a JWT token
exports.verifyToken = (token) => {
  try {
    // If the token has a 'Bearer ' prefix, remove it
    if (token.startsWith('Bearer ')) {
      token = token.slice(7).trim(); // Slice off 'Bearer ' and remove any leading/trailing spaces
    }

    console.log(token); // Log the token for debugging purposes

    // Verify the token using the secret key from environment variables
    return jwt.verify(token, process.env.JWTSECRET);
  } catch (err) {
    // Log an error if token verification fails
    console.error('Token verification failed:', err.message);

    // Return null if the token is invalid or verification fails
    return null;
  }
};
