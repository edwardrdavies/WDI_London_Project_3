const Messages = require('../models/message');

function messagesCreate(req, res) {
  Message.create(req.body, (err, message) => {
    if(err)res.status(500).json({error: err});
    res.status(201).json(message);
  });
}

function messagesIndex(req, res) {
  Message.find({}, (err, messages) => {
    if(err)res.status(500).json({errpr: err});
    res.json(messages);
  });
}
module.exports = {
  create: messagesCreate,
  index: messagesIndex

};
