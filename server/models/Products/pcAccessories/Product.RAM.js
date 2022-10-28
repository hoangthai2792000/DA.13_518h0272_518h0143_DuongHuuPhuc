const mongoose = require('mongoose')

const RAMSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: [true, 'productID must be provided'],
  },
  capacity: {
    type: Number,
    required: true,
    enum: [2, 4, 8, 16, 32, 64],
    default: 4,
  },
  bus: {
    type: Number,
    required: true,
    enum: [1600, 2400, 2666, 3000, 3200, 3333, 3600],
    default: 1600,
  },
  type: {
    type: String,
    required: true,
    enum: ['DDR3', 'DDR4', 'DDR5'],
  },
  warrantyPeriod: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('RAM', RAMSchema)
