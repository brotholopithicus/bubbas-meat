const router = require('express').Router();
const nodemailer = require('nodemailer');

/* POST send email */
router.post('/', (req, res, next) => {
  if (!req.body) return res.sendStatus(404);
  
  const options = {
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  }

  let transporter = nodemailer.createTransport(options);

  const messageOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Contact Form Submission',
    text: req.body.message + '\n' + req.body.email,
    html: `<p>${req.body.message}</p><hr /><b>${req.body.name}</b><br /><span>${req.body.company}</span><br /><i>${req.body.email}</i>`
  }

  transporter.sendMail(messageOptions, (err, info) => {
    if (err) return res.json({ message: 'FAILURE', err, info });
    return res.json({ message: 'SUCCESS', info });
  });
});

module.exports = router;
