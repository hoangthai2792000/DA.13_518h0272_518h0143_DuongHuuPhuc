const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name must be provided'],
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Email must be provided'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Password must be provided'],
    minLength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  address: {
    type: String,
    required: [true, 'Address must be provided'],
    minLength: 6,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number must be provided'],
    trim: true,
    unique: true,
    validate: {
      validator: function isVietnamesePhoneNumber(number) {
        return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number)
      },
      message: 'Please provide valid phone number',
    },
  },
  verificationToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Date,
  },
  passwordToken: {
    type: String,
  },
  passwordTokenExpired: {
    type: Date,
  },
})

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.checkPassword = async function (inputPassword) {
  const isPasswordMatch = await bcrypt.compare(inputPassword, this.password)
  return isPasswordMatch
}

module.exports = mongoose.model('User', UserSchema)
