const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
  tflId: { type: String, required: true },
  name: { type: String, required: true },
  modeName: {type: String, required: true },
  handle: { type: String, required: true },
  color: { type: String }
});

module.exports = mongoose.model('Line', lineSchema);
