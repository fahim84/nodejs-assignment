const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const cartRouter = require('./routes/cart');
const dbConnect = require('./DB/db');
const { authMiddleware } = require('./middlware/auth');

const app = express();

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
