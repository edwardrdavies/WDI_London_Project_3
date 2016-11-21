const request = require('request-promise');

function status(req, res) {
  request
    .get({
      url: 'https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground/Status',
      qs: {
        app_id: process.env.TFL_APP_ID,
        app_key: process.env.TFL_APP_SECRET
      },
      json: true
    })
    .then((data) => {
      data = data.map((statusObject) => {
        return {
          tflId: statusObject.id,
          name: statusObject.name,
          status: statusObject.lineStatuses[0].statusSeverityDescription,
          severity: statusObject.lineStatuses[0].statusSeverity
        };
      });
      if(req.query.lines) {
        const linesToKeep = req.query.lines.split(',');
        data = data.filter((line) => {
          return linesToKeep.includes(line.tflId);
        });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

module.exports = {
  status
};
