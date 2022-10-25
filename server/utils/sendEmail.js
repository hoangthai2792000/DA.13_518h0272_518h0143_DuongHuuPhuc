// const nodemailer = require('nodemailer')
// const nodeMailerConfig = require('./nodeMailerConfig')
const sgMail = require('@sendgrid/mail')

const sendEmail = async ({ to, subject, html }) => {
  // let testAccount = await nodemailer.createTestAccount()

  // const transporter = nodemailer.createTransport(nodeMailerConfig)

  // return transporter.sendMail({
  //   from: '"admin" <admin@gmail.com>',
  //   to,
  //   subject,
  //   html,
  // })
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: to, // Change to your recipient
    from: 'hoangthai2792000@gmail.com', // Change to your verified sender
    subject: subject,
    html: html,
  }
  const info = await sgMail.send(msg)
  return info
}

module.exports = sendEmail
