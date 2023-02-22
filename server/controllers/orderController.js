const Order = require('../models/Order')
const Product = require('../models/Product')

const customError = require('../errors/customError')
const checkPermission = require('../utils/checkPermisson')

const fakeStripeAPI = async ({ amount, currency }) => {
  const clientSecret = 'random value'
  return { clientSecret, amount }
}

// GET ALL ORDERS
const getAllOrders = async (req, res) => {
  const orders = await Order.find({})

  res.status(200).json({ totalOrders: orders.length, orders })
}

// GET SINGLE ORDER
const getSingleOrder = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id })

  if (!order) {
    throw new customError(
      `Can not find any orders with the id: ${req.params.id}`,
      400
    )
  }

  checkPermission(req.user, order.user)

  res.status(200).json({ order })
}

// GET CURRENT USER ORDERS
const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId })
  if (!orders) {
    throw new customError('Can not find any orders', 404)
  }
  res.status(200).json({ totalOrders: orders.length, orders })
}

// CREATE ORDER
const createOrder = async (req, res) => {
  const { items: cartItems, shippingFee } = req.body

  if (!cartItems || cartItems.length < 1) {
    throw new customError('Please provide order items', 400)
  }

  if (!shippingFee) {
    throw new customError('Please provide shipping fee', 400)
  }

  let orderItems = []
  let subtotal = 0 // subtotal = price * quantity for every items

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item._id })
    if (!dbProduct) {
      throw new customError(`No product with id: ${item._id}`, 404)
    }

    const { name, price, code } = dbProduct
    // console.log(name, price, image)
    const singleOrderItem = {
      name,
      price,
      code,
      product: item._id,
      amount: item.quantity,
    }

    orderItems.push(singleOrderItem)
    subtotal += item.quantity * price
  }
  // console.log(orderItems)
  // console.log(subtotal)
  const total = shippingFee + subtotal

  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'vnd',
  })

  const order = await Order.create({
    shippingFee,
    subtotal,
    total,
    orderItems,
    user: req.user.userId,
    // user: req.body.user,
    clientSecret: paymentIntent.clientSecret,
  })

  res.status(201).json({ order, clientSecret: order.clientSecret })
}

// UPDATE ORDER
const updateOrder = async (req, res) => {
  const { paymentId } = req.body

  const order = await Order.findOne({ _id: req.params.id })

  if (!order) {
    throw new customError(
      `Can not find any orders with the id: ${req.params.id}`,
      400
    )
  }

  checkPermission(req.user, order.user)

  order.paymentId = paymentId
  order.status = 'Đã thanh toán'
  await order.save()

  res.status(200).json({ order })
}

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
}
