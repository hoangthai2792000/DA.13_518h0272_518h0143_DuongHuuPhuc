const mongoose = require('mongoose')

const SingleOrderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
})

const OrderSchema = new mongoose.Schema(
  {
    shippingFee: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: {
      type: [SingleOrderItemSchema],
    },
    status: {
      type: String,
      enum: [
        'Đang xử lý',
        'Thất bại',
        'Đang vận chuyển',
        'Đã thanh toán',
        'Đã hủy',
      ],
      default: 'Đang xử lý',
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', OrderSchema)
