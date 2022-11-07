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

// ProductSchema.statics.isAvailable = function (size){
//   let totalStock = 0
//   size.map((s)=>{
//     totalStock += s.sizeStock
//   })
//   if(totalStock<1){
//     this.available = false
//   }
// }

ProductSchema.pre('findOneAndUpdate', async function () {
  let totalStock = 0
  let size = this.getUpdate().size

  if (size) {
    size.map((s) => (totalStock += s.sizeStock))
    if (totalStock < 1) {
      this.set({ available: false })
    } else {
      this.set({ available: true })
    }
  } else return
})

module.exports = mongoose.model('Product', ProductSchema)
