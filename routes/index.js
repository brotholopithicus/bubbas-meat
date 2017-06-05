const router = require('express').Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: `Home - Gordo Gustavo's` });
});

/* GET about page. */
router.get('/about', (req, res, next) => {
  res.render('about', { title: `About - Gordo Gustavo's` });
});

/* GET services page. */
router.get('/services', (req, res, next) => {
  res.render('services', { title: `Services - Gordo Gustavo's` });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('contact', { title: `Contact - Gordo Gustavo's` });
});

module.exports = router;
