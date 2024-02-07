import mongoose from 'mongoose'
import moment from 'moment'

const CommentSchema = new mongoose.Schema({
  contents: {
    type: String,
    required: true // 내용이 있는 댓글만 허용
  },
  date: {
    type: String,
    default: moment().format('YYYY-MM-DD hh:mm:ss')
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  creatorName: { // 댓글을 달 때 작성자의 이름도 보내서 데이터베이스에 부담을 덜어준다.
    type: String
  }
})

const Comment = mongoose.model('comment', CommentSchema)

export default Comment
