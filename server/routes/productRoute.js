const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  uploadProductDescImage,
  deleteImage,
} = require('../controllers/productController')
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication')

const express = require('express')
const router = express.Router()

router
  .route('/')
  .get(getAllProducts)
  .post([authenticateUser, authorizePermissions('admin')], createProduct)

router
  .route('/upload-product-image/:productCode')
  .post([authenticateUser, authorizePermissions('admin')], uploadProductImage)

router
  .route('/upload-productDesc-image/:productCode')
  .post(
    [authenticateUser, authorizePermissions('admin')],
    uploadProductDescImage
  )

router
  .route('/delete-image')
  .delete([authenticateUser, authorizePermissions('admin')], deleteImage)

router
  .route('/:id')
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePermissions('admin')], updateProduct)
  .delete([authenticateUser, authorizePermissions('admin')], deleteProduct)

module.exports = router
