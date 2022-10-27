const mongoose = require('mongoose')

const VGASchema = new mongoose.Schema({
  productID: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: [true, 'productID must be provided'],
  },
  engine: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập engine đồ họa'],
  },
  capacity: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập bộ nhớ card màn hình'],
  },
  bus: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập chuẩn Bus của card màn hình'],
  },
  busBit: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập giao diện bộ nhớ card màn hình'],
  },
  memorySpeed: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập tốc độ bộ nhớ card màn hình'],
  },
  port: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập port card màn hình'],
  },
  maxResolution: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập độ phân giải card màn hình'],
  },
  psu: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập PSU đề nghị của card màn hình'],
  },
  warrantyPeriod: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('VGA', VGASchema)
