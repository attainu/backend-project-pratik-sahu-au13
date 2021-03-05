const Article = require('../models/articleModel');

exports.getHomepage = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles: articles });
  } catch (error) {
    console.log(error.message);
  }
};

exports.newArticleRoute = (req, res) => {
  res.render('articles/new', { article: new Article() });
};

exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (article == null) res.redirect('/');
    res.render('articles/show', { article: article });
  } catch (error) {
    console.log(error.message);
  }
};

exports.createArticle = async (req, res) => {
  let article = new Article({
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (err) {
    console.log(err.message);
    res.render('articles/new', { article: article });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
  }
};
