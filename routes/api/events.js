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

/* POST create / update event. */
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
    }
  }

  if (req.body.url && req.body.text) {
    data.link = {
      url: req.body.url,
      text: req.body.text
    }
  }
  Event.findOneAndUpdate({ title: data.title }, data, { upsert: true }, (err, doc) => {
    if (err) return next(err);
    return res.json({ message: 'SUCCESS', doc });
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
