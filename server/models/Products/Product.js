const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng nhập tên sản phẩm'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Vui lòng nhập giá sản phẩm'],
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'Vui lòng nhập loại sản phẩm'],
      enum: {
        values: [
          'Laptop',
          'Mainboard',
          'RAM',
          'VGA',
          'Disk',
          'CPU',
          'Monitor',
          'Headphone',
          'Keyboard',
          'Mouse',
        ],
        messages: '{VALUE} is not supported',
      },
    },
    brand: {
      type: String,
      required: [true, 'Vui lòng nhập thương hiệu sản phẩm'],
      trim: true,
    },
    image: { type: [String], required: true, trim: true },
    stock: {
      type: Number,
      required: true,
      default: 10,
    },
    sold: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: { type: Number, default: 0 },
    averageRating: {
      type: Number,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)