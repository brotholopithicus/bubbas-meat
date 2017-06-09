const router = require('express').Router();
const nodemailer = require('nodemailer');
const Event = require('../models/Event');

/* GET base api */
router.get('/', (req, res, next) => {
  res.send('Welcome to API');
});

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
    html: `<blockquote><p>${req.body.message}</p></blockquote><hr /><b>${req.body.name}</b><br /><i>${req.body.email}</i><hr />`
  }

  transporter.sendMail(messageOptions, (err, info) => {
    if (err) return res.json({ message: 'FAILURE', err, info });
    return res.json({ message: 'SUCCESS', info });
  });
});

/* POST new event. */
router.post('/event', (req, res, next) => {
  if (!req.body) return res.sendStatus(404);
  const data = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    location: {
      address: {
        street: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
      }
    },
    link: req.body.link
  }
  const event = new Event(data);
  event.save((err, evt) => {
    if (err) return next(err);
    res.json({ message: 'SUCCESS', evt });
  });
});

/* DELETE event. */
router.delete('/event/:id', (req, res, next) => {
  Event.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err) return next(err);
    console.log('successfully deleted: ', doc);
    return res.json({ message: 'OK', doc });
  });
});

/* GET event list. */
router.get('/events', (req, res, next) => {
  Event.find({}, (err, events) => {
    if (err) return next(err);
    res.json(events);
  });
});

module.exports = router;
