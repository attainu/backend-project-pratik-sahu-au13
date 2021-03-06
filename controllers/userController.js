const User = require('../models/userModel');

exports.getRegisterRoute = (req, res) => {
  res.render('register', { user: new User() });
};

exports.createUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    await user.save();
    console.log(user);
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    return res.redirect('/auth/register');
  }
};
