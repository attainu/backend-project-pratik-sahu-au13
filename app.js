const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

const Article = require('./models/articleModel');
const articleRouter = require('./routes/articleRoutes');

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/src`));
app.use(methodOverride('_method'));

// ROUTES
app.use('/', articleRouter);
app.use('/articles', articleRouter);

module.exports = app;
