const express = require('express');
const articleController = require('../controllers/articleController');
const router = express.Router();
const middleware = require('../middlewares/middlewares');

router
  .route('/')
  .get(articleController.getHomepage)
  .post(articleController.createArticle);

router
  .route('/new')
  .get(middleware.checkUserSession, articleController.newArticleRoute);

router
  .route('/:id')
  .get(articleController.getArticle)
  .delete(articleController.deleteArticle);

module.exports = router;
