const mongoose = require('mongoose')

const LaptopSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: [true, 'productID must be provided'],
  },
  cpu: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập CPU của laptop'],
  },
  displaySize: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập kích thước màn hình của laptop'],
  },
  vga: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập card màn hình của laptop'],
  },
  disk: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập ổ cứng của laptop'],
  },
  ram: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập RAM của laptop'],
  },
  pin: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập pin của laptop'],
  },
  weight: {
    type: Number,
    default: 0,
  },
  color: {
    type: String,
    required: [true, 'Vui lòng nhập màu sắc của laptop'],
    trim: true,
  },
  warrantyPeriod: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('Laptop', LaptopSchema)
