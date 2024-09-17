const User = require('../models/user');
const encrypt = require('../middleware/encrypt');
const token = require('../middleware/token');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await encrypt.hashPassword(password);
    user = new User({ username, email, password: hashedPassword });
    await user.save();

    const userToken = token.generateToken(user.id);
    res.json({ token: userToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await encrypt.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const userToken = token.generateToken(user.id);
    res.json({ token: userToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};