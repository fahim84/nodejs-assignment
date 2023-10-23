var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories');
var cartRouter = require('./routes/cart');
const dbConnect = require('./DB/db');
const { authMiddleware } = require('./middlware/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', authMiddleware, usersRouter);
app.use('/product', authMiddleware, productsRouter);
app.use('/category', authMiddleware, categoriesRouter);
app.use('/cart', authMiddleware, cartRouter);

dbConnect();

module.exports = app;