const nodemailer = require('nodemailer');
//require('dotenv').config();

exports.sendEmail = (mailMessage) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const message = {
    from: process.env.EMAIL,
    to: mailMessage.email,
    subject: mailMessage.subject,
    html: mailMessage.html
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('email has been sent', info.response);
      return info.response;
    }
  });
};