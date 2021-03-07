const express = require('express');
const Article = require('../models/articleModel');
const router = express();

// rendering new route
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

// rendering edit route
router.get('/:id/edit', (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    res.render('articles/edit', {article: article})
  })
})

// edit route
router.put('/:id', (req, res) => {
  Article.findByIdAndUpdate(req.params.id, req.body, (err, article) => {
    if (err) {
      res.redirect('/');
    } else {
      res.redirect(`/articles/${req.params.id}`)
    }
  })
})

// delete route
router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

module.exports = router;
