const mongoose = require('mongoose')

const HeadphoneSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: [true, 'productID must be provided'],
  },
  type: {
    type: String,
    required: [true, 'Vui lòng nhập loại headphone'],
    enum: {
      values: ['In-ear', 'Over-ear', 'On-Ear', 'Earbuds'],
      message: '{VALUE} is not supported',
    },
  },
  jack: {
    type: String,
    required: [true, 'Vui lòng nhập chuẩn kết nối của headphone'],
    enum: {
      values: [
        '3.5mm',
        'Bluetooth',
        'USB',
        'Bluetooth 4.0',
        'Bluetooth 5.0',
        'Wireless',
      ],
      message: '{VALUE} is not supported',
    },
  },
  color: {
    type: String,
    required: [true, 'Vui lòng nhập màu sắc của headphone'],
    trim: true,
  },
  warrantyPeriod: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('Headphone', HeadphoneSchema)
