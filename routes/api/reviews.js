const router = require('express').Router();
const Review = require('../../models/Review');

const auth = require('../auth');

/* GET all reviews */
router.get('/', (req, res, next) => {
  Review.find({}).then((reviews) => {
    return res.json({ message: 'SUCCESS', reviews });
  }).catch(next);
});

/* POST new review */
router.post('/', auth.required, (req, res, next) => {
  let review = new Review();
  review.quote = req.body.quote;
  review.name = req.body.name;
  review.save().then((doc) => {
    return res.json({ message: 'SUCCESS', doc });
  }).catch(next);
});

/* DELETE review. */
router.delete('/:id', auth.required, (req, res, next) => {
  Review.findByIdAndRemove(req.params.id, () => {
    return res.json({ message: 'SUCCESS' });
  }).catch(next);
});

module.exports = router;