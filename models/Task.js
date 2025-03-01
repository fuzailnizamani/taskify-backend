const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  description: String,
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
});

module.exports = mongoose.model('Task', taskSchema);