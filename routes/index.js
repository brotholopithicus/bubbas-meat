const router = require('express').Router();
const Event = require('../models/Event');
const User = require('../models/User');

const api = require('./api');

const auth = require('./auth');

router.use((req, res, next) => {
  if (req.cookies.jwt) {
    req.headers.authorization = req.cookies.jwt;
  }
  next();
});

router.use('/api', api);

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

/* GET reviews page. */
router.get('/reviews', (req, res, next) => {
  res.render('reviews', { title: `Reviews - Gordo Gustavo's` });
});

/* GET admin page. */
router.get('/admin', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then((user) => {
    if (!user) return res.redirect('/login');
    Event.find({}, (err, events) => {
      if (err) return next(err);
      res.render('admin', { title: `Admin - Gordo Gustavo's`, events });
    });
  }).catch(next);
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: `Login - Gordo Gustavo's` });
});


module.exports = router;
