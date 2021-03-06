const User = require('../models/userModel');

exports.getRegisterRoute = (req, res) => {
  res.render('register', { user: new User() });
};

exports.createUser = async (req, res) => {
  try {
    var user = new User(
      {
        username: '',
        email: '',
        password: '',
      },
      { _id: false }
    );
    await user.save();
    console.log(user);
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    return res.redirect('/auth/register');
  }
};
