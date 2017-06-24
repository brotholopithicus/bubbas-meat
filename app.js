const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');

// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpack = require('webpack');
// const webpackConfig = require('./webpack.config');

require('dotenv').config();

const routes = require('./routes');

const app = express();
// const compiler = webpack(webpackConfig);


mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('connected to mongodb'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(webpackDevMiddleware(compiler, {
//   publicPath: '/'
// }));

app.use(helmet());
app.use(compression());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'gordogustavos', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

require('./config/passport');

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === 'UnauthorizedError') {
    return res.redirect('/login');
  } else {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
});

module.exports = app;
