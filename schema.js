const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    // unique: true,
    // trim: true,
    // minlength: [3, 'Username must be at least 3 characters long']
  },
  lastName: {
    type: String,
    required: true,
    // unique: true,
    // trim: true,
    // lowercase: true,
    // validate(value) {
    //   if (!validator.isEmail(value)) {
    //     throw new Error('Email is invalid');
    //   }
    // }
  },
  email: {
    type: String,
    required: true,
    // minlength: [6, 'Password must be at least 6 characters long'],
    // trim: true,
    // validate(value) {
    //   if (value.toLowerCase().includes('password')) {
    //     throw new Error('Password cannot contain "password"');
    //   }
    // }
  },
  // age: {
  //   type: Number,
  //   default: 0,
  //   validate(value) {
  //     if (value < 0) {
  //       throw new Error('Age must be a positive number');
  //     }
  //   }
  // }
});

const User = mongoose.model('User', userSchema);

module.exports = User;