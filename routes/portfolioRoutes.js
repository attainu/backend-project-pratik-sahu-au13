const express = require('express');
const portfolioController = require('../controllers/portfolioController');
const router = express.Router();
const middleware = require('../middlewares/middlewares');

router.route('/').post(portfolioController.createPortfolio);

router.route('/fill').get(portfolioController.getFillRoute);

router.route('/profile').get(portfolioController.getProfile);

router
  .route('/:id')
  .get(portfolioController.getPortfolio)
  // .put(portfolioController.editPortfolio)
  .delete(portfolioController.deletePortfolio);

// router.route('/:id/edit').get(portfolioController.editPortfolioRoute);

module.exports = router;
