const router = require('express').Router();
const User = require('../../models/User');
const passport = require('passport');
const auth = require('../auth');

/* GET users page. */
router.get('/user', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then((user) => {
    if (!user) return res.sendStatus(401);
    return res.json({ user: user.toAuthJSON() });
  }).catch(next);
});

/* POST user login. */
router.post('/users/login', (req, res, next) => {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: `can't be blank` } });
  }
  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: `can't be blank` } });
  }
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (user) {
      user.token = user.generateJWT();
      res.cookie('jwt', `Token ${user.token}`);
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

/* GET all users. */
router.get('/users', (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);
    return res.json(users);
  });
});

/* POST new user. */
router.post('/users', (req, res, next) => {
  let user = new User();
  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);
  user.save().then(() => {
    return res.json({ user: user.toAuthJSON() });
  }).catch(next);
});


module.exports = router;
