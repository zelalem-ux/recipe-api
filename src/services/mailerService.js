const nodemailer = require('nodemailer')
const { SENDER_EMAIL_ADDRESS, APP_PASSWORD } = process.env

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SENDER_EMAIL_ADDRESS,
    pass: APP_PASSWORD,
  },
})

class MailerService {
  async sendEmail(
    receiver,
    html,
    text,
    subject = 'Reminder to Complete Your Registration'
  ) {
    const mailOptions = {
      from: 'Sender Name <' + SENDER_EMAIL_ADDRESS + '>',
      to: receiver,
      subject,
      html,
      text,
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }
}

module.exports = MailerService
