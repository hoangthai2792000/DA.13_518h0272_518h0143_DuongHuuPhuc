const User = require('../models/User')
const Token = require('../models/Token')
const customError = require('../errors/customError')
const crypto = require('crypto')
const sendVerificationEmail = require('../utils/sendVerificationEmail')
const createTokenUser = require('../utils/createTokenUser')
const { sendCookies } = require('../utils/jwt')

// REGISTER
const register = async (req, res) => {
  const { email, name, password, phoneNumber, address } = req.body
  // console.log(req.body)

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

  const verificationToken = crypto.randomBytes(40).toString('hex')
  const user = await User.create({
    email,
    name,
    password,
    role,
    phoneNumber,
    address,
    verificationToken,
  })

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin: 'http://localhost:3000',
  })

  res.status(201).json({
    msg: 'Success! Please check your email to verify account',
    // verificationToken: user.verificationToken,
  })
}

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new customError('Email and Password must be provided', 400)
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new customError(`Can not find any user with the email: ${email}`, 401)
  }

  const isPasswordCorrect = await user.checkPassword(password)

  if (!isPasswordCorrect) {
    throw new customError('Wrong Password, Please try again', 401)
  }

  if (!user.isVerified) {
    throw new CustomError('Please Verify Your Email', 401)
  }

  const tokenUser = createTokenUser(user)

  // create refresh token
  let refreshToken = ''

  // check token is existed
  const existingToken = await Token.findOne({ user: user._id })

  // if token exist and valid, sendCookies to create accessToken and refreshToken
  if (existingToken) {
    const isValid = existingToken.isValid
    if (!isValid) {
      throw new customError('Invalid Credentials', 401)
    }
    refreshToken = existingToken.refreshToken
    sendCookies({ res, user: tokenUser, refreshToken })
    res.status(200).json({ user: tokenUser })
    return
  }

  // if token is not existed
  refreshToken = crypto.randomBytes(40).toString('hex')
  const userAgent = req.headers['user-agent']
  const ip = req.ip

  const userToken = { refreshToken, userAgent, ip, user: user._id }
  const token = await Token.create(userToken)

  sendCookies({ res, user: tokenUser, refreshToken })

  res.status(200).json({ user: tokenUser })
}

// LOGOUT
const logout = async (req, res) => {
  res.send('logout')
}

// VERIFY EMAIL
const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    throw new customError(
      `Can not find any users with the email: ${email}`,
      401
    )
  }

  if (user.verificationToken.length < 1) {
    throw new customError(`Your account is already verified`, 401)
  }

  if (verificationToken !== user.verificationToken) {
    throw new customError('Verification Token Does Not Match', 401)
  }

  user.isVerified = true
  user.verified = Date.now()
  user.verificationToken = ''

  await user.save()

  res.status(200).json({ msg: 'Email Verified' })
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
