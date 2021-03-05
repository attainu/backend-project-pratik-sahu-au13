const express = require('express');
const articleController = require('../controllers/articleController');
const router = express.Router();

router
  .route('/')
  .get(articleController.getHomepage)
  .post(articleController.createArticle);

router.route('/new').get(articleController.newArticleRoute);

router
  .route('/:id')
  .get(articleController.getArticle)
  .delete(articleController.deleteArticle);

module.exports = router;
