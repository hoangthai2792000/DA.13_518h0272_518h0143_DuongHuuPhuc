const mongoose = require('mongoose')

const LaptopSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: [true, 'productID must be provided'],
  },
})

module.exports = mongoose.model('Laptop', LaptopSchema)
