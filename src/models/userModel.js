const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please provide a first name'],
  },
  lastname: {
    type: String,
    required: [true, 'Please provide a last name'],
  },
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please provide a phone number'],
  },
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
