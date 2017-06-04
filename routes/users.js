const router = require('express').Router();

/* GET users page. */
router.get('/', (req, res, next) => {
  res.send('Respond with resource');
});

module.exports = router;
