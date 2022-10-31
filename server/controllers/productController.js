const Product = require('../models/Product')

const customError = require('../errors/customError')

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  const products = await Product.find({}, 'image name price')

  res.status(200).json({ totalProducts: products.length, products })
}

// GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id })

  if (!product) {
    throw new customError(`No product with the id: ${req.params.id}`, 400)
  }

  res.status(200).json({ product })
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
