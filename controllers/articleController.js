const Article = require('../models/articleModel');

exports.getHomepage = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    // console.log(articles);
    res.render('articles/index', { articles: articles });
  } catch (error) {
    console.log(error.message);
  }
};

exports.newArticleRoute = (req, res) => {
  if (req.session.userId) {
    return res.render('articles/new', { article: new Article() });
  }
  res.redirect('/auth/login');
};

exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id }).populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    });
    if (article) {
      console.log(article);
      res.render('articles/show', { article });
    }
  } catch (error) {
    console.log(error.message);
    res.redirect('/');
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

exports.getEditRoute = (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    res.render('articles/edit', { article: article });
  });
};

exports.editArticle = async (req, res) => {
  let article = await Article.findById(req.params.id);
  article.title = req.body.title;
  article.image = req.body.image;
  article.description = req.body.description;
  article.markdown = req.body.markdown;
  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (error) {
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
