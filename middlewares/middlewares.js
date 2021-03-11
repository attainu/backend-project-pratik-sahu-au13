const Article = require('../models/articleModel');
const Comment = require('../models/commentModel');
const User = require('../models/userModel');

exports.commentOwner = (req, res, next) => {};

exports.isLoggedIn = (req, res, next) => {
  // console.log(req.session.userId);
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/auth/login');
  }
};

exports.checkUserSession = (req, res, next) => {
  User.findById(req.session.userId, (err, user) => {
    if (err || !user) {
      return res.redirect('/auth/login');
    }
    next();
  });
};

exports.preventAuthedUser = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect('/');
  }
  next();
};

exports.currentUser = (req, res, next) => {
  res.locals.user = req.session.userId;
  next();
};
