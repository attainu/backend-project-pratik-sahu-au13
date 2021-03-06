const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router
  .route('/register')
  .get(userController.getRegisterRoute)
  .post(userController.createUser);

module.exports = router;
