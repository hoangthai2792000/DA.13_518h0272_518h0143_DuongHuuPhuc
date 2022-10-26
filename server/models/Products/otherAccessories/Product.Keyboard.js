const mongoose = require('mongoose')

const KeyboardSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: [true, 'productID must be provided'],
  },
  type: {
    type: String,
    required: [true, 'Vui lòng nhập loại bàn phím'],
    enum: {
      values: ['Thường', 'Giả cơ', 'Cơ'],
      message: '{VALUE} is not supported',
    },
  },
  jack: {
    type: String,
    required: [true, 'Vui lòng nhập chuẩn kết nối của bàn phím'],
    enum: {
      values: ['USB', 'USB Type C', 'Wireless'],
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
  switch: {
    type: String,
    enum: ['BLue', 'Brown', 'Black', 'Red', 'Orange', 'Grey', 'Green', ''],
    default: '',
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

module.exports = mongoose.model('Keyboard', KeyboardSchema)
