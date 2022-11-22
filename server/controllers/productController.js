const Product = require('../models/Product')

const customError = require('../errors/customError')
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const axios = require('axios')

const uploadImage = require('../utils/uploadImage')

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  const products = await Product.find({}, 'image name price size')

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
  const { name, code, price, brand } = req.body

  if (!name || !code || !price || !brand) {
    throw new customError('Vui lòng nhập đầy đủ thông tin sản phẩm', 400)
  }

  const isExist = await Product.findOne({ code })
  if (isExist) {
    throw new customError('Sản phẩm này đã tồn tại', 400)
  }

  // // Insert Image To Milvus
  // const imgToMilvus = await axios.post(
  //   'http://127.0.0.1:8000/api/v1/insert-image-to-milvus',
  //   {
  //     imgURL: req.body.image,
  //     productCode: code,
  //     productBrand: brand,
  //   }
  // )
  // console.log(imgToMilvus.data)

  const product = await Product.create(req.body)
  return res.status(201).json({ product })
}

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  if (!req.body.newImages) {
    throw new customError('Please provide new images', 400)
  }

  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  )

  if (!product) {
    throw new customError(
      `Can not find any product with the ID: ${req.prams.id}`,
      400
    )
  }

  // Insert only new images to Milvus
  const imgToMilvus = await axios.post(
    'http://127.0.0.1:8000/api/v1/insert-image-to-milvus',
    {
      imgURL: req.body.newImages,
      productCode: code,
      productBrand: brand,
    }
  )
  // console.log(imgToMilvus.data)

  res.status(200).json({ product })
}

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id })

  if (!product) {
    throw new customError(
      `Can not find any product with the ID: ${req.prams.id}`,
      400
    )
  }

  await cloudinary.api.delete_resources_by_prefix(`Products/${product.code}`)
  await cloudinary.api.delete_folder(`Products/${product.code}`)
  await product.remove()

  res.status(200).json({ msg: 'Product Deleted' })
}

// UPLOAD PRODUCT IMAGE
const uploadProductImage = async (req, res) => {
  const { productCode } = req.params

  const result = await uploadImage(productCode, req.files)

  return res.status(200).json({ result })
}

// DELETE IMAGE
const deleteImage = async (req, res) => {
  const { imageURL } = req.body
  const { productCode } = req.params

  if (!imageURL) {
    throw new customError('Vui lòng cung cấp URL ảnh sản phẩm', 400)
  }
  const imgURL = imageURL

  if (!productCode) {
    throw new customError('Vui lòng cung cấp code sản phẩm', 400)
  }
  const product = await Product.findOne({ code: productCode })
  if (!product) {
    throw new customError('Sản phẩm không tồn tại', 400)
  }

  // REMOVE IMAGE ON CLOUDINARY
  const start = imageURL.indexOf('Products')
  const tmpPublicId = imageURL.slice(start) // "Products/suv1/tmp-1-1667307770831_klv8lu.jpg"
  const end = tmpPublicId.indexOf('.')
  const publicId = tmpPublicId.slice(0, end) // "Products/suv1/tmp-1-1667307770831_klv8lu"

  const deletedImg = await cloudinary.uploader.destroy(publicId)

  // REMOVE IMAGE URL IN DB
  const newImgArr = product.image.filter((image) => image !== imageURL)
  product.image = newImgArr
  await product.save()

  // DELETE IMAGE FROM MILVUS
  const deleteImgFromMilvus = await axios.delete(
    'http://127.0.0.1:8000/api/v1/delete-image-from-milvus',
    {
      productBrand: product.brand,
      imgURL: imgURL,
    }
  )
  // console.log(imgToMilvus.data)

  res.status(200).json({ product, deletedImg })
}

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  deleteImage,
}
