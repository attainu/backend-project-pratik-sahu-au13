const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getRegisterRoute = (req, res) => {
  res.render('register', { user: new User() });
};

exports.createUser = async (req, res) => {
  try {
    var user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    console.log(user);
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    return res.redirect('/auth/register');
  }
};

exports.getLoginRoute = (req, res) => {
  res.render('login');
};

exports.loginUser = async (req, res) => {
  await User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.redirect('/auth/login');
    if (!user) return res.redirect('/auth/register');
    else {
      bcrypt.compare(req.body.password, user.password, (err, same) => {
        if (err || !same) {
          console.log('password not correct');
          res.redirect('/auth/login');
        } else {
          res.redirect('/');
        }
      });
    }
  });
};
