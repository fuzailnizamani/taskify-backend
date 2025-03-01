const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { username, pwd } = req.body;
    if (!username || !pwd) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const result = await bcrypt.compare(pwd, foundUser.password);
    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: foundUser._id, username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: false, // Change to true for production
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log("Setting cookie:", refreshToken); // Debugging
    console.log("Cookies in response headers:", res.getHeaders()["set-cookie"]); // Debugging

    res.json({ accessToken });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error, please try again later." });
  }
};

module.exports = login;