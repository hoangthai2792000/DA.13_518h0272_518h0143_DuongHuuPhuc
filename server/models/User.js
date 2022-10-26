const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập tên'],
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Vui lòng nhập email'],
    validate: {
      validator: validator.isEmail,
      message: 'Vui lòng nhập email hợp lệ',
    },
  },
  password: {
    type: String,
    required: [true, 'Vui lòng nhập mật khẩu'],
    minLength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  address: {
    type: String,
    required: [true, 'Vui lòng nhập địa chỉ'],
    minLength: 6,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Vui lòng nhập số điện thoại'],
    trim: true,
    unique: true,
    validate: {
      validator: function isVietnamesePhoneNumber(number) {
        return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number)
      },
      message: 'Vui lòng nhập số điện thoại hợp lệ',
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
