const mongoose = require('mongoose')

const MonitorSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: [true, 'productID must be provided'],
  },
  panel: {
    type: String,
    enum: {
      values: ['IPS', 'VA', 'TN', 'PLS', 'MVA', 'KHT'],
      message: '{VALUE} is not supported',
    },
  },
  displaySize: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập kích thước màn hình'],
  },
  resolution: {
    type: String,
    required: [true, 'Vui lòng nhập độ phân giải màn hình'],
    enum: {
      values: [
        '1920x1080',
        '2560x1440',
        '1366x768',
        '1600x900',
        '3840x2160',
        '2560x1080',
        '3440x1440',
      ],
      message: '{VALUE} is not supported',
    },
  },
  frequency: { type: Number, default: 60 },
  port: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập độ cổng kết nối của màn hình'],
  },
  warrantyPeriod: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('Monitor', MonitorSchema)
