const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send('Welcome to API');
});

router.post('/', (req, res, next) => {
  if (!req.body) return res.sendStatus(404);
  res.status(200).send({ message: 'SUCCESS', body: req.body });
});

module.exports = router;
