const mongoose = require('mongoose')

const MainboardSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: [true, 'productID must be provided'],
  },
  socket: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập socket của mainboard'],
  },
  chipset: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập chipset của mainboard'],
  },
  size: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập size của mainboard'],
  },
  usbPort: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập cổng USB của mainboard'],
  },
  ramPort: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập cổng RAM của mainboard'],
  },
  diskPort: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập cổng ổ cứng của mainboard'],
  },
  warrantyPeriod: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('Mainboard', MainboardSchema)
