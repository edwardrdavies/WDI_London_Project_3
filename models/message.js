const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  tflId: { type: String, required: true }, // line ObjectId
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }, // user ObjectId
  messageText: {type: String, required: true } // Message
});

module.exports = mongoose.model('Message', messageSchema);
