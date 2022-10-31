const Product = require('../models/Product')

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
  const { name, price, category, brand, warrantyPeriod, specs } = req.body

  if (!name || !price || !category || !brand || !warrantyPeriod || !specs) {
    throw new customError('Vui lòng nhập đầy đủ thông tin sản phẩm', 400)
  }

  specs.map((s) => {
    if (!s.k || !s.v) {
      throw new customError(
        'Vui lòng nhập đầy đủ thông số kỹ thuật của sản phẩm',
        400
      )
    }
  })

  const product = await Product.create(req.body)
  return res.status(201).json({ product })
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
