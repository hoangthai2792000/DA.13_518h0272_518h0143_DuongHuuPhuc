const mongoose = require('mongoose')

const ProductDescriptionSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: [true, 'productID must be provided'],
  },
  title: { type: String, required: true, trim: true },
  desc: {
    type: Array,
    content: { type: String, required: true, trim: true },
    photo: { type: String, required: true, trim: true },
  },
})

module.exports = mongoose.model('ProductDescription', ProductDescriptionSchema)
