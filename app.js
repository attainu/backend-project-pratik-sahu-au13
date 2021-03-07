const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const articleRouter = require('./routes/articleRoutes');
const userRouter = require('./routes/userRoutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/src`));
app.use(methodOverride('_method'));

// ARTICLE ROUTES
app.use('/', articleRouter);
app.use('/articles', articleRouter);

// USER AUTHENTICATION ROUTES
app.use('/auth', userRouter);
app.use('/users', userRouter);

module.exports = app;
