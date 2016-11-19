const Line = require('../models/line');

function linesIndex(req, res) {
  Line.find((err, lines) => {
    if(err) return res.status(500).json({ error: err });
    return res.json(lines);
  });
}

function linesShow(req, res) {
  Line.findById(req.params.id, (err, line) => {
    if(err) return res.status(500).json({ error: err });
    if(!line) return res.status(404).json({ error: 'Not found' });
    return res.json(line);
  });
}

function linesUpdate(req, res) {
  Line.findById(req.params.id, (err, line) => {
    if(err) return res.status(500).json({ error: err });
    if(!line) return res.status(404).json({ error: 'Not found' });

    for(const key in req.body) {
      line[key] = req.body[key];
    }

    line.save((err, line) => {
      if(err) return res.status(400).json({ error: err });
      res.json(line);
    });
  });
}

module.exports = {
  index: linesIndex,
  show: linesShow,
  update: linesUpdate
};
