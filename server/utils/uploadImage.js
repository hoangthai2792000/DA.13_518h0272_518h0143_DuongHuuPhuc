const customError = require('../errors/customError')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadImage = async (productCode, reqFiles) => {
  if (!productCode) {
    throw new customError('Vui lòng cung cấp code sản phẩm', 400)
  }

  if (!reqFiles) {
    throw new customError('No File Uploaded', 400)
  }

  const productImgs = reqFiles.image
  // console.log(productImgs)
  let result = []

  // If user upload more than 1 image
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

  // If only 1 image
  if (!productImgs.mimetype.startsWith('image')) {
    throw new customError('Image Only!!!', 400)
  }
  if (productImgs.size > 1024 * 1024) {
    throw new customError('Please upload image smaller than 1MB', 400)
  }

  try {
    let uploadImg = await cloudinary.uploader.upload(productImgs.tempFilePath, {
      use_filename: true,
      folder: `Products/${productCode}/`,
    })
    result.push(uploadImg.secure_url)
    fs.unlinkSync(productImgs.tempFilePath)
  } catch (error) {
    throw new customError(error.message, 400)
  }

  return result
}

module.exports = uploadImage
