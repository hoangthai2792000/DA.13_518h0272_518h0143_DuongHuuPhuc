const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} = require('../controllers/orderController')

const express = require('express')
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication')

router
  .route('/')
  .get([authenticateUser, authorizePermissions('admin')], getAllOrders)
  // .get(getAllOrders)
  .post(createOrder)

router.route('/myAllOrders').get(getCurrentUserOrders)

router.route('/:id').get(getSingleOrder).patch(updateOrder)

module.exports = router
