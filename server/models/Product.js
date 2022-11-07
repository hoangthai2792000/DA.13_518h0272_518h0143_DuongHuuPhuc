const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng nhập tên sản phẩm'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'Vui lòng nhập code sản phẩm'],
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, 'Vui lòng nhập giá sản phẩm'],
      default: 0,
    },
    brand: {
      type: String,
      required: [true, 'Vui lòng nhập thương hiệu sản phẩm'],
      enum: {
        values: ['JORDAN', 'NIKE', 'ADIDAS', 'VANS', 'CONVERSE'],
        message: '{VALUE} is not supported',
      },
      trim: true,
    },
    image: { type: [String], required: true, trim: true, default: [] },
    available: {
      type: Boolean,
      default: true,
    },
    size: {
      type: Array,
      sizeNum: { type: Number },
      sizeStock: { type: Number },
      default: [],
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
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)
