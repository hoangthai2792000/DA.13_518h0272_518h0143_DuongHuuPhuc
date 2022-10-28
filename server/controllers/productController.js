const Product = require('../models/Products/Product')
const customError = require('../errors/customError')

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  res.send('Get All Products')
}

// GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
  res.send('Get Single Product')
}

// CREATE PRODUCT
const createProduct = async (req, res) => {
  res.send('Create Product')
}

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  res.send('Update Product')
}

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  res.send('Delte Product')
}

// UPLOAD IMAGE
const uploadImage = async (req, res) => {
  res.send('Upload Image')
}

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
}
