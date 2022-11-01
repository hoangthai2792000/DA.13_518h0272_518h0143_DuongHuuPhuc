const Product = require('../models/Product')

const customError = require('../errors/customError')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

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
  const { name, code, price, category, brand, warrantyPeriod, specs } = req.body

  if (
    !name ||
    !code ||
    !price ||
    !category ||
    !brand ||
    !warrantyPeriod ||
    !specs
  ) {
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

  const isExist = await Product.findOne({ code })
  if (isExist) {
    throw new customError('Sản phẩm này đã tồn tại', 400)
  }

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

// UPLOAD PRODUCT IMAGE
const uploadProductImage = async (req, res) => {
  const { productCode } = req.params

  if (!productCode) {
    throw new customError('Vui lòng cung cấp code sản phẩm', 400)
  }

  if (!req.files) {
    throw new customError('No File Uploaded', 400)
  }

  const productImgs = req.files.image
  // console.log(productImgs)
  let result = []

  if (productImgs.length >= 2) {
    for (const img of productImgs) {
      if (!img.mimetype.startsWith('image')) {
        throw new customError('Image Only!!!', 400)
      }
      if (img.size > 1024 * 1024) {
        throw new customError('Please upload image smaller than 1MB', 400)
      }

      try {
        let uploadImg = await cloudinary.uploader.upload(img.tempFilePath, {
          use_filename: true,
          folder: `Products/${productCode}`,
        })
        result.push(uploadImg.secure_url)
        fs.unlinkSync(img.tempFilePath)
      } catch (error) {
        throw new customError(error.message, 400)
      }
    }

    return result
  }

  if (!productImgs.mimetype.startsWith('image')) {
    throw new customError('Image Only!!!', 400)
  }
  if (productImgs.size > 1024 * 1024) {
    throw new customError('Please upload image smaller than 1MB', 400)
  }

  try {
    let uploadImg = await cloudinary.uploader.upload(productImgs.tempFilePath, {
      use_filename: true,
      folder: `Products/${productCode}`,
    })
    result.push(uploadImg.secure_url)
    fs.unlinkSync(productImgs.tempFilePath)
  } catch (error) {
    throw new customError(error.message, 400)
  }

  // return res.status(200).json({ result })
  return result
}

// UPLOAD PRODUCT DESCRIPTION IMAGE
const uploadProductDescImage = async (req, res) => {
  const { productCode } = req.params

  if (!productCode) {
    throw new customError('Vui lòng cung cấp code sản phẩm', 400)
  }

  if (!req.files) {
    throw new customError('No File Uploaded', 400)
  }

  const productImgs = req.files.image
  // console.log(productImgs)
  let result = []

  if (productImgs.length >= 2) {
    for (const img of productImgs) {
      if (!img.mimetype.startsWith('image')) {
        throw new customError('Image Only!!!', 400)
      }
      if (img.size > 1024 * 1024) {
        throw new customError('Please upload image smaller than 1MB', 400)
      }

      try {
        let uploadImg = await cloudinary.uploader.upload(img.tempFilePath, {
          use_filename: true,
          folder: `Products/${productCode}/desc`,
        })
        result.push(uploadImg.secure_url)
        fs.unlinkSync(img.tempFilePath)
      } catch (error) {
        throw new customError(error.message, 400)
      }
    }

    return result
  }

  if (!productImgs.mimetype.startsWith('image')) {
    throw new customError('Image Only!!!', 400)
  }
  if (productImgs.size > 1024 * 1024) {
    throw new customError('Please upload image smaller than 1MB', 400)
  }

  try {
    let uploadImg = await cloudinary.uploader.upload(productImgs.tempFilePath, {
      use_filename: true,
      folder: `Products/${productCode}/desc`,
    })
    result.push(uploadImg.secure_url)
    fs.unlinkSync(productImgs.tempFilePath)
  } catch (error) {
    throw new customError(error.message, 400)
  }

  // return res.status(200).json({ result })
  return result
}

// DELETE IMAGE
const deleteImage = async (req, res) => {
  const { imageURL } = req.body

  if (!imageURL) {
    throw new customError('Vui lòng cung cấp URL ảnh sản phẩm', 400)
  }

  const start = imageURL.indexOf('Products')
  const tmpPublicId = imageURL.slice(start) // "Products/suv1/tmp-1-1667307770831_klv8lu.jpg"
  const end = tmpPublicId.indexOf('.')
  const publicId = tmpPublicId.slice(0, end) // "Products/suv1/tmp-1-1667307770831_klv8lu"

  const deletedImg = await cloudinary.uploader.destroy(publicId)

  res.status(200).json({ deletedImg })
}

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  uploadProductDescImage,
  deleteImage,
}
