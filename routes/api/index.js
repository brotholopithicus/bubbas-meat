const router = require('express').Router();

const events = require('./events');
const email = require('./email');
const users = require('./users');

router.use('/', users);
router.use('/email', email);
router.use('/events', events);

module.exports = router;
