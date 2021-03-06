const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: false,
  },
  email: {
    type: String,
    // required: false,
  },
  password: {
    type: String,
    // required: false,
  },
});

userSchema.pre('save', async function (next) {
  const user = this;
  bcrypt.hash(user.password, 8, function (err, encrypted) {
    user.password = encrypted;
    next();
  });
});

module.exports = mongoose.model('User', userSchema);
