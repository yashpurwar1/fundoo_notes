const nodemailer = require('nodemailer');
const { logger } = require('../../logger/logger.js');

/**
 * @module:         nodemailer
 * @file:           nodemailer.js
 * @description:    Takes the mailMessage, and sends it to the recievers mail 
 * @author:         Yash
*/

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
      logger.error(err)
    } else {
      logger.info('email has been sent', info.response)
      console.log('email has been sent', info.response);
      return info.response;
    }
  });
};