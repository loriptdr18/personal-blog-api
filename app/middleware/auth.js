// Import the custom token module for verifying JWT tokens
const token = require('./token');

// Middleware function to check if the request has a valid JWT token
module.exports = function(req, res, next) {
  // Retrieve the token from the 'Authorization' header
  const userToken = req.header('Authorization');

  // If no token is provided, send a 401 (Unauthorized) response
  if (!userToken) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    // Verify the token using the token verification method from the custom token module
    const decoded = token.verifyToken(userToken);

    // Attach the decoded user information to the request object (req.user)
    req.user = decoded.user;

    // Call the next middleware function in the stack
    next();
  } catch (err) {
    // If token verification fails, send a 401 (Unauthorized) response
    res.status(401).json({ message: 'Token is not valid' });
  }
};
