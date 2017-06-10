const router = require('express').Router();
const Event = require('../../models/Event');

const auth = require('../auth');

/* GET event list. */
router.get('/', (req, res, next) => {
  Event.find({}, (err, events) => {
    if (err) return next(err);
    res.json(events);
  });
});

/* POST new event. */
router.post('/new', auth.required, (req, res, next) => {
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
    link: {
      url: req.body.url,
      text: req.body.linktext
    }
  }
  const event = new Event(data);
  event.save((err, evt) => {
    if (err) return next(err);
    res.json({ message: 'SUCCESS', evt });
  });
});

/* DELETE event. */
router.delete('/:id', auth.required, (req, res, next) => {
  Event.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err) return next(err);
    console.log('successfully deleted: ', doc);
    return res.json({ message: 'OK', doc });
  });
});


module.exports = router;
