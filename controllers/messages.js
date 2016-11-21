const Message = require('../models/message');

function messagesIndex(req, res) {
  Message.find(req.query)
    .populate('user')
    .exec((err, messages) => {
      if(err)res.status(500).json({errpr: err});
      res.json(messages);
    });
}

function messagesCreate(req, res) {
  req.body.user = req.user;
  Message.create(req.body, (err, message) => {
    if(err)res.status(500).json({error: err});
    res.status(201).json(message);
  });
}

module.exports = {
  index: messagesIndex,
  create: messagesCreate
};
