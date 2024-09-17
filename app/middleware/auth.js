const token = require('./token');

module.exports = function(req, res, next) {
  const userToken = req.header('Authorization');
  if (!userToken) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = token.verifyToken(userToken);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};