const router = require('express').Router();

const events = require('./events');
const email = require('./email');
const users = require('./users');
const reviews = require('./reviews');

router.use('/', users);
router.use('/email', email);
router.use('/events', events);
router.use('/reviews', reviews);

module.exports = router;
