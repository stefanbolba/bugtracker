const express = require('express');
const path = require('path');
const hemlet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
// const compression = require('compression');

const issueRouter = require('./routes/issueRoutes');
const userRouter = require('./routes/userRoutes');
const commentsRouter = require('./routes/commentsRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const versionRouter = require('./routes/versionRoutes');
const viewRouter = require('./routes/viewRoutes');
const AppError = require('./utils/appError');
const globalErrorHadler = require('./controllers/errorController');

//Start express
const app = express();

//Use a renderer for html pages
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
//Used for static files like html etc
app.use(express.static(path.join(__dirname, 'dist')));

// Set security HTTP headers
app.use(hemlet());
// Development loging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Body parser, rading data from the body in req.body
//Used to see in the console the req.params
app.use(express.json({ limt: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

//Creates bugs. Need to investigate more
//Compression midleware
// app.use(compression);

//ROUTES
app.use('/', viewRouter);

app.use('/api/v1/issues', issueRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentsRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/version', versionRouter);

//UNIDENTIFIED ROUTES MIDLEWARE
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//ERROR HANDLING MIDLEWARE
app.use(globalErrorHadler);

//Used in server.js
module.exports = app;
