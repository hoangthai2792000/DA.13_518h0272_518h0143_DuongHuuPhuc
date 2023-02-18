const User = require("../models/User");
const Token = require("../models/Token");
const customError = require("../errors/customError");
const createTokenUser = require("../utils/createTokenUser");
const { sendCookies } = require("../utils/jwt");
const checkPermission = require("../utils/checkPermisson");

// GET ALL USERS
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");

  res.status(200).json({ users });
};

// GET SINGLE USER
const getSingleUser = async (req, res) => {
  // console.log(req.user)
  const user = await User.findOne({ _id: req.params.id }).select("-password");

  if (!user) {
    throw new customError(`No user with the id: ${req.params.id}`, 404);
  }

  checkPermission(req.user, user._id);

  res.status(200).json({ user });
};

// SHOW CURRENT USER
const showCurrentUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};

// UPDATE USER
const updateUser = async (req, res) => {
  const { name, email, address, phoneNumber } = req.body;
  if (!name || !email || !address || !phoneNumber) {
    throw new customError(
      "Vui lòng nhập đầy đủ tên, email, địa chỉ và số điện thoại",
      400
    );
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { name, email, role: req.user.role, address, phoneNumber },
    { new: true, runValidators: true }
  );

  const tokenUser = createTokenUser(user);
  let refreshToken = "";
  const existingToken = await Token.findOne({ user: user._id });
  refreshToken = existingToken.refreshToken;
  sendCookies({ res, user: tokenUser, refreshToken });

  res.status(200).json({ user: tokenUser });
};

// UPDATE USER PASSWORD
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new customError("Vui lòng nhập mật khẩu cũ và mới", 400);
  }

  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.checkPassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new customError("Sai mật khẩu", 401);
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({ msg: "Thay đổi mật khẩu thành công" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
