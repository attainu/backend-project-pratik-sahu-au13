const Article = require('../models/articleModel');

exports.getHomepage = async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' });
  res.render('articles/index', { articles: articles });
};

exports.newArticleRoute = (req, res) => {
  res.render('articles/new', { article: new Article() });
};

exports.getArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article == null) res.redirect('/');
  res.render('articles/show', { article: article });
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
    res.render('articles/new', { article: article });
  }
};

exports.deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect('/');
};
