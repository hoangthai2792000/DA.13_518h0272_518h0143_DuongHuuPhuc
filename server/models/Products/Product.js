const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name must be provided'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price must be provided'],
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'Category must be provided'],
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
      required: [true, 'Brand must be provided'],
      trim: true,
    },
    image: { type: [String], required: true, trim: true },
    stock: {
      type: Number,
      required: true,
      default: 10,
    },
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
