const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
});

function sendMail (user, done) {
  console.log('user: ', user);
  transporter.sendMail({
    to: user.email,
    from: `${process.env.GMAIL_USERNAME}@gmail.com`,
    subject: 'Thanks for your registration to Twitter for London.',
    text: `Hi ${user.username}. Welcome to Twitter for London.

    Please click on the link below to complete your registration process:
    http://localhost:8000/#/confirm/${user.confirmationCode}

    Cheers!`
  }, done);
}

module.exports = {
  sendMail
};
