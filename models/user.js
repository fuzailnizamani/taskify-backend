const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  refreshToken: { type: String } // Ensure this field is present
});

module.exports = mongoose.model('User', userSchema);