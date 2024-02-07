import mongoose from 'mongoose'
import moment from 'moment'

// Create Schema
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true // 검색기능 활성화
  },
  contents: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: -2 // 처음 조회하는 사람조차도 조회수가 기록되기 때문에 그사람의 조회 수를 빼준다.
  },
  fileUrl: { // 이미지 업로드
    type: String,
    default: 'https://source.unsplash.com/random/301x201'
  },
  date: {
    type: String,
    default: moment().format('YYYY-MM-DD hh:mm:ss')
  },
  category: { // 하나의 게시물은 하나의 카테고리를 가진다.
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment'
  }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
})

const Post = mongoose.model('post', PostSchema)

export default Post
