const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const Article = require('./models/articleModel');
const articleRouter = require('./routes/articleRoutes');

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/src`));

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' });
  res.render('articles/index', { articles: articles });
});

// ROUTES
app.use('/articles', articleRouter);

module.exports = app;
