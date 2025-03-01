const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sigup = async (req, res) => {
  try {
    const { username, pwd } = req.body;
    if (!username || !pwd) {
      res.status(404).json({ message: ' username and password is requested' });
    }
    const hashedpassword = await bcrypt.hash(pwd, 10);
    const user = new User({
      username: username,
      password: hashedpassword
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully ' });
  } catch (error) {
    res.status(500).json({ error: 'server failures' });
  }
};

module.exports = sigup; 