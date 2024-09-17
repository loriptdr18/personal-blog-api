const jwt = require('jsonwebtoken');

exports.generateToken = (userId) => {
  const payload = { user: { id: userId } };
  return jwt.sign(payload, process.env.JWTSECRET);
};

exports.verifyToken = (token) => {
  try {
    // Remove 'Bearer ' prefix if it exists
    if (token.startsWith('Bearer ')) {
      token = token.slice(7).trim();
    }
    
    console.log(token);
    return jwt.verify(token, process.env.JWTSECRET);
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return null;
  }
};
