const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NOT_MAILER_USER,
    pass: process.env.NOT_MAILER_PASS
  }
});

const mailer = (to, token) => {
  const mailOptions = {
    from: 'fadilmuiz1319@gmail.com',
    to,
    subject: 'Dont tell anyone else',
    text: `Dont tell anyone else ${token} your new password`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error.message);
    }
    console.log('Email sent: ' + info.response);
  });
}

module.exports = mailer