import mongoose from 'mongoose'

// Create Schema
const CategorySchema = new mongoose.Schema({
  categoryName: { // Post하나에 하나의 카테고리
    type: String,
    default: '미분류'
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }]
})

const Category = mongoose.model('category', CategorySchema)

export default Category
