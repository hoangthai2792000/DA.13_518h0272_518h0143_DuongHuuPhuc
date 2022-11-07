const Review = require('../models/Review')
const Product = require('../models/Product')

const customError = require('../errors/customError')
const checkPermission = require('../utils/checkPermisson')

// CREATE REVIEW
const createReview = async (req, res) => {
  res.send('Create Review')
}

// GET ALL REVIEWS
const getAllReviews = async (req, res) => {
  res.send('Get All Reviews')
}

// GET SINGLE REVIEW
const getSingleReview = async (req, res) => {
  res.send('Get Single Review')
}

// UPDATE REVIEW
const updateReview = async (req, res) => {
  res.send('Update Review')
}

// DELETE REVIEW
const deleteReview = async (req, res) => {
  res.send('Delete Review')
}

// GET SINGLE PRODUCT REVIEWS
const getSingleProductReviews = async (req, res) => {
  res.send('Get Single Product Reviews')
}

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
}
