const User = require('../models/user');

const handleLogout = async (req, res) => {
  try {
    // check for jwt cookie
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content

    const refreshToken = cookies.jwt;

    // Find user with the matching refreshToken
    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
      return res.sendStatus(204);
    };

    // 1. Removeing the refreshToken to the foundUser document
    foundUser.refreshToken = '';
    // 2.Save the updated user document to MongoDB
    await foundUser.save();

    console.log(`User ${foundUser.username} logged out successfully.`);

    // Clear the jwt cookie
    res.clearCookie("jwt", { httpOnly: true, sameSite: 'Lax', secure: false, maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error, please try again later.' });
  };
};
module.exports = handleLogout;