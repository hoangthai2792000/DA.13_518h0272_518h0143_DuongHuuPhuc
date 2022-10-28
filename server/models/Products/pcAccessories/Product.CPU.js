const mongoose = require('mongoose')

const CPUSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: [true, 'productID must be provided'],
  },
  socket: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập socket của CPU'],
  },
  cache: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập bộ nhớ đệm của CPU'],
  },
  core: {
    type: Number,
    required: [true, 'Vui lòng nhập số nhân của CPU'],
  },
  thread: {
    type: Number,
    required: [true, 'Vui lòng nhập số luồng của CPU'],
  },
  baseFrequency: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập xung cơ bản của CPU'],
  },
  maxFrequency: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập xung tối đa của CPU'],
  },
  graphic: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập card đồ họa tích hợp của CPU'],
  },
  warrantyPeriod: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('CPU', CPUSchema)
