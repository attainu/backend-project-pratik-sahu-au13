const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const articleRouter = require('./routes/articleRoutes');
const userRouter = require('./routes/userRoutes');
const commentRouter = require('./routes/commentRoutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/src`));
app.use(methodOverride('_method'));

// ARTICLE ROUTES
app.use('/', articleRouter);
app.use('/articles', articleRouter);

// USER ROUTES
app.use('/auth', userRouter);
app.use('/users', userRouter);

// COMMENT ROUTES
app.use('/articles/:id/comments', commentRouter);

module.exports = app;
