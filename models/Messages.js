const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userID: String,
  timestamp: Date,
  message: String,
  status: {
    type: String,
    default: 'Unsolved',
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
