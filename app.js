var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

require('dotenv').config();
var session = require('express-session');

var indexRouter = require('./routes/index.js');
var usersRouter = require('./routes/users.js');
var loginRouter = require('./routes/admin/login.js');
var adminRouter = require('./routes/admin/novedades.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'PW2023awqyeudj',
    resave: false,
    saveUninitialized: true
  })
);

let secured = async (req, res, next) => {
  try {
    console.log(req.session.usuario);
    if (req.session.usuario) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  } catch (error) {
    console.log(error);
  }
};

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, adminRouter);

module.exports = app;
