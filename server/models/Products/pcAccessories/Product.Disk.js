const mongoose = require('mongoose')

const DiskSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: [true, 'productID must be provided'],
  },
  type: {
    type: String,
    enum: {
      values: ['SSD', 'HDD'],
      message: '{VALUE} is not supported',
    },
  },
  connector: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập chuẩn giao tiếp của ổ cứng'],
  },
  size: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập kích thước ổ cứng'],
  },
  capacity: {
    type: Number,
    required: [true, 'Vui lòng nhập dung lượng ổ cứng'],
  },
  readSpeed: { type: Number, default: 0 },
  writeSpeed: { type: Number, default: 0 },
  warrantyPeriod: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('Disk', DiskSchema)
