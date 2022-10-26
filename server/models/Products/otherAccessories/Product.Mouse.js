const mongoose = require('mongoose')

const MouseSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: [true, 'productID must be provided'],
  },
  type: {
    type: String,
    required: [true, 'Vui lòng nhập loại chuột'],
    enum: {
      values: ['Có dây', 'Không dây'],
      message: '{VALUE} is not supported',
    },
  },
  led: {
    type: String,
    required: [true, 'Vui lòng nhập led của bàn phím'],
    enum: {
      values: ['Không led', 'Đơn sắc', 'Rainbow', 'RGB'],
      message: '{VALUE} is not supported',
    },
  },
  dpi: {
    type: String,
    required: [true, 'Vui lòng nhập DPI của chuột'],
  },
  sensor: {
    type: String,
    required: [true, 'Vui lòng nhập cảm biến của chuột'],
  },
  numbOfButtons: {
    type: Number,
    required: [true, 'Vui lòng nhập số nút bấm của chuột'],
  },
  color: {
    type: String,
    required: [true, 'Vui lòng nhập màu sắc của bàn phím'],
    trim: true,
  },
  warrantyPeriod: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('Mouse', MouseSchema)
