const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  tflId: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  messageText: {type: String, required: true }
});

module.exports = mongoose.model('Message', messageSchema);
