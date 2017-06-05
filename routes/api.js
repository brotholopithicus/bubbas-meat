const router = require('express').Router();
const nodemailer = require('nodemailer');

router.get('/', (req, res, next) => {
  res.send('Welcome to API');
});

router.post('/', (req, res, next) => {
  if (!req.body) return res.sendStatus(404);

  const options = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  }

  let transporter = nodemailer.createTransport(options);

  const messageOptions = {
    from: req.body.email,
    to: 'jamespjarvis@gmail.com',
    subject: 'Contact Form Submission',
    text: req.body.message + '\n' + req.body.email,
    html: `<blockquote cite='${req.body.name}\n${req.body.email}'><p>${req.body.message}</p></blockquote><hr /><b>${req.body.name}</b><br /><i>${req.body.email}</i><hr />`
  }

  transporter.sendMail(messageOptions, (err, info) => {
    if (err) return next(err);
    console.log('Message %s send: %s', info.messageId, info.response);
  });
  
  res.status(200).send({ message: 'SUCCESS', body: req.body });
});

module.exports = router;
