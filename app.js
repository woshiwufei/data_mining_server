const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category')
const commentRouter = require('./routes/comment')
const infoRouter = require('./routes/info')
const messageRouter = require('./routes/message')
const uploadRouter = require('./routes/upload')
const chapterRouter = require('./routes/chapter')
const courseRouter = require('./routes/course')
// const courseRouter = require('./routes/course')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/comment', commentRouter);
app.use('/info', infoRouter);
app.use('/message', messageRouter);
app.use('/upload', uploadRouter);
app.use('/chapter', chapterRouter);
app.use('/course', courseRouter);
// app.use('/course', uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
