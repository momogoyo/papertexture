import express from 'express'
import Post from '../../models/post'
const router = express.Router()

router.get('/:searchTerm', async (req, res, next) => {
  try {
    const result = await Post.find({
      title: {
        $regex: req.params.searchTerm,
        $options: 'i' // 덜 민감하게 (대소문자 구분없이 검색 가능하게 하도록 한다.)
      }
    })

    console.log(result, 'Search Result')
    res.send(result)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

export default router
