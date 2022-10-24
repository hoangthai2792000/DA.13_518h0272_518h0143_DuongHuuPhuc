const User = require('../models/User')
const customError = require('../errors/customError')

// REGISTER
const register = async (req, res) => {
  const { email, name, password, phoneNumber, address } = req.body
  console.log(req.body)

  const isEmailExisted = await User.findOne({ email })
  if (isEmailExisted) {
    throw new customError('Your Email has already existed', 400)
  }
  const isPhoneNumberExisted = await User.findOne({ phoneNumber })
  if (isPhoneNumberExisted) {
    throw new customError('Your phone number has already existed', 400)
  }

  const isFirstAccount = (await User.countDocuments({})) === 0
  // console.log(isFirstAccount)
  const role = isFirstAccount ? 'admin' : 'user'

  // const verificationToken = crypto.randomBytes(40).toString('hex')
  const user = await User.create({
    email,
    name,
    password,
    role,
    // verificationToken,
    phoneNumber,
    address,
  })

  res.status(201).json({ user })
}

// LOGIN
const login = async (req, res) => {
  res.send('login')
}

// LOGOUT
const logout = async (req, res) => {
  res.send('logout')
}

// VERIFY EMAIL
const verifyEmail = async (req, res) => {
  res.send('verify email')
}

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  res.send('forgot password')
}

// RESET PASSWORD
const resetPassword = async (req, res) => {
  res.send('reset password')
}

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
}
