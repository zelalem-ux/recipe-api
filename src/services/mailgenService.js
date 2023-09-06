var Mailgen = require('mailgen')

// Configure mailgen by setting a theme and your product info
var mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    // Appears in header & footer of e-mails
    name: 'APP Title',
    link: 'https://example.com',
    logo: 'https://example.com/assets/logo.png',
    logoHeight: '90px',
  },
})

class MailgenService {
  async generateMail(fullName, uniqueToken) {
    var email = {
      body: {
        greeting: 'Dear',
        signature: 'Sincerely',
        name: fullName,
        intro:
          'Thank you for registering on our online Recipe sharing app! Your registration was successful and we are excited to have you.',
        action: {
          instructions:
            'To access the recipe sharing app, you need to confirm your account using the link below.',

          button: {
            // color: '#081587',
            text: 'Confirm',
            link: 'https://example.com/confirm/' + uniqueToken,
          },
        },

        outro:
          "<br><br><br>If you have any questions or need help with anything, please don't hesitate to contact us.",
      },
    }

    // Generate an HTML email with the provided contents
    var emailHtml = await mailGenerator.generate(email)
    var emailText = mailGenerator.generatePlaintext(email)
    return { emailHtml, emailText }
  }
}

module.exports = MailgenService
