const express = require('express');
const Article = require('../models/articleModel');
const router = express();

// new article
router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() });
});

// find article by id
router.get('/:id', async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article == null) res.redirect('/');
  res.render('articles/show', { article: article });
});

// posting new article
router.post('/', async (req, res) => {
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
})

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

module.exports = router;
