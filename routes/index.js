const router = require('express').Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: `Home - Gordo Gustavo's` });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('contact', { title: `Contact - Gordo Gustavo's` });
});

module.exports = router;
