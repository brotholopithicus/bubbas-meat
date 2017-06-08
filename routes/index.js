const router = require('express').Router();
const Event = require('../models/Event');

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

/* GET events page. */
router.get('/events', (req, res, next) => {
  Event.find({}, (err, events) => {
    if (err) return next(err);
    res.render('events', { title: `Events - Gordo Gustavo's`, events });
  });
});

/* GET admin page. */
router.get('/admin', (req, res, next) => {
  res.render('admin', { title: `Admin - Gordo Gustavo's` });
});

module.exports = router;
