const router = require('express').Router();
const Review = require('../../models/Review');

const auth = require('../auth');

const quotes = require('./quotes');

/* GET swanson quote */
router.get('/quote', (req, res, next) => {
  const randQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return res.json({ message: 'SUCCESS', quote: randQuote });
});

/* GET all reviews */
router.get('/', (req, res, next) => {
  Review.find({}).then((reviews) => {
    return res.json({ message: 'SUCCESS', reviews });
  }).catch(next);
});

router.get('/approved', (req, res, next) => {
  Review.find({ show: true }).then((reviews) => {
    return res.json({ message: 'SUCCESS', reviews });
  }).catch(next);
});

/* POST new review */
router.post('/', auth.required, (req, res, next) => {
  let review = new Review();
  review.quote = req.body.quote;
  review.name = req.body.name;
  review.save().then((review) => {
    return res.json({ message: 'SUCCESS', review });
  }).catch(next);
});

/* PUT update review */
router.put('/:id', auth.required, (req, res, next) => {
  Review.findById(req.params.id, (err, review) => {
    if (err) return next(err);
    review.show = !review.show;
    review.save().then((review) => {
      return res.json({ message: 'SUCCESS', review })
    }).catch(next);
  });
});

/* DELETE review. */
router.delete('/:id', auth.required, (req, res, next) => {
  Review.findByIdAndRemove(req.params.id, () => {
    return res.json({ message: 'SUCCESS' });
  }).catch(next);
});

module.exports = router;
