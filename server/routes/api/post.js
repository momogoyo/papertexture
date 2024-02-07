import express from 'express'

// Model
import Post from '../../models/post'
import User from '../../models/user'
import Category from '../../models/category'
import Comment from '../../models/comment'
import '@babel/polyfill'
import auth from '../../middleware/auth'
import moment from 'moment'

// multer는 파일들을 주고 받을 수 있도록 도와주는 라이브러리
import multer from 'multer'
// 뒤에 S3가 붙음으로써 S3와 상호 주고받을 수 있도록 도와준다.
import multerS3 from 'multer-s3'
// 경로를 깊이 파악할 수 있도록 도와주는 라이브러리
import path from 'path'
// AWS를 사용할 수 있도록 도와주는 개발자 도구
import AWS from 'aws-sdk'
import dotenv from 'dotenv'
import { isNullOrUndefined } from 'util'

const router = express.Router()
dotenv.config()

// S3 Setting
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY
})

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: 'meblog2021/upload',
    region: 'ap-northeast-2',
    key (req, file, cb) {
      const ext = path.extname(file.originalname) // 파일의 확장자
      const basename = path.basename(file.originalname, ext)
      cb(null, basename + new Date().valueOf() + ext) //  파일이름 + 업로드시간
    }
  }),
  limits: { fileSize: 100 * 1024 * 1024 } // 파일 용량

})

// @route    Post api/post/image
// @desc     Create a Post
// @access   Private
router.post('/image', uploadS3.array('upload', 5), async (req, res, next) => { // 게시판에 파일을 보내고나서 화면에 보여주기 위한 라우터
  try {
    console.log(req.files.map((v) => v.location))
    res.json({ uploaded: true, url: req.files.map((v) => v.location) })
  } catch (e) {
    console.error(e)
    res.json({ uploaded: false, url: null })
  }
})

// [Infinite Scroll]
//  @route    GET api/post
//  @desc     More Loading Posts
//  @access   public
router.get('/skip/:skip', async (req, res) => {
  try {
    const postCount = await Post.countDocuments()
    const postFindResult = await Post.find().skip(Number(req.params.skip)).limit(6).sort({ date: -1 }) // 가장 최신의 글부터 나오도록 한다.

    const categoryFindResult = await Category.find()
    const result = { postFindResult, categoryFindResult, postCount }

    res.json(result)
  } catch (e) {
    console.log(e)
    res.json({ msg: '더 이상 포스트가 없습니다' })
  }
})

// // api/post
// router.get('/', async(req, res) => { // 모든 post를 검색할 수 있다.
//     const postFindResult = await Post.find();
//     const categoryFindResult = await Category.find();
//     const result = { postFindResult, categoryFindResult };

//     res.json(result);
// });

// @route    POST api/post
// @desc     Create a Post
// @access   Private
router.post('/', auth, uploadS3.none(), async (req, res, next) => { // auth: 인증된 유저가 쓴 글인지 확인, 별도로 S3에 저장하지는 않는다.
  try {
    console.log('req: ', req)
    const { title, contents, fileUrl, creator, category } = req.body // body라는 곳에 내용을 담아서 보낸다! // 구조분해방식 req.body.title, req.body.contents...
    const newPost = await Post.create({ // 새로 post를 만들면 반드시 mongoDB에 요청해야한다.
      title, // 단순히 title 이렇게 축약 가능
      contents,
      fileUrl,
      creator: req.user.id,
      date: moment().format('YYYY-MM-DD hh:mm:ss')
    })

    const findResult = await Category.findOne({
      categoryName: category
    })

    console.log(findResult, 'findResult')

    if (isNullOrUndefined(findResult)) { // 카테고리를 처음 만들때는 당연히 이름이 없기 때문에
      const newCategory = await Category.create({
        categoryName: category
      })

      await Post.findByIdAndUpdate(newPost._id, { // 메소드 이름대로 아이디를 찾아서 update
        $push: { category: newCategory._id } // $push: 배열로 넣으라는 뜻
      })

      await Category.findByIdAndUpdate(newCategory._id, {
        $push: { posts: newPost._id }
      })

      await User.findByIdAndUpdate(req.user.id, { // 글쓴이와 게시물 연결
        $push: {
          posts: newPost._id
        }
      })
    } else {
      await Category.findByIdAndUpdate(findResult._id, {
        $push: { posts: newPost._id }
      })
      await Post.findByIdAndUpdate(newPost._id, {
        category: findResult._id
      })
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          posts: newPost._id
        }
      })
    }

    return res.redirect(`/api/post/${newPost._id}`)
  } catch (e) {
    console.log(e)
  }
})

// @route    POST api/post/:id
// @desc     Detail Post
// @access   Public
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('creator', 'name')
      .populate({ path: 'category', select: 'categoryName' })
    post.views += 1
    post.save()
    console.log(post)
    res.json(post)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

// [Comments Route]

// @route    Get api/post/:id/comments
// @desc     Get All Comments
// @access   public
router.get('/:id/comments', async (req, res) => { // post의 id를 검색(어떤 post인지)
  try {
    const comment = await Post.findById(req.params.id).populate({
      path: 'comments'
    })
    const result = comment.comments
    console.log(result, 'comment load')
    res.json(result)
  } catch (e) {
    console.log(e)
  }
})

router.post('/:id/comments', async (req, res, next) => {
  console.log(req, 'comments')
  const newComment = await Comment.create({
    contents: req.body.contents,
    creator: req.body.userId,
    creatorName: req.body.userName,
    post: req.body.id,
    date: moment().format('YYYY-MM-DD hh:mm:ss')
  })
  console.log(newComment, 'newComment')

  try {
    await Post.findByIdAndUpdate(req.body.id, {
      $push: {
        comments: newComment._id
      }
    })

    await User.findByIdAndUpdate(req.body.userId, {
      $push: {
        comments: {
          post_id: req.body.id,
          comment_id: newComment._id
        }
      }
    })

    res.json(newComment)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

// @route    Delete api/post/:id
// @desc     Delete a Post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  await Post.deleteMany({ _id: req.params.id })
  await Comment.deleteMany({ post: req.params.id })
  await User.findByIdAndUpdate(req.user.id, { // 쓴 사람 id
    $pull: {
      posts: req.params.id, // id 찾기
      comments: { post_id: req.params.id }
    }
  })

  const CategoryUpdateResult = await Category.findOneAndUpdate(
    { posts: req.params.id },
    { $pull: { posts: req.params.id } },
    { new: true } // 업데이트를 하기 위한 필수 값
  )

  if (CategoryUpdateResult.posts.length === 0) { // 카테고리가 하나도 없는 경우
    await Category.deleteMany({ _id: CategoryUpdateResult }) // 카테고리에 배열이 하나도 없다면 지워준다.
  }

  return res.json({ success: true })
})

// @route    GET api/post/:id/edit
// @desc     Edit Post
// @access   Private
router.get('/:id/edit', auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('creator', 'name') // creator와 name을 생성
    res.json(post)
  } catch (e) {
    console.error(e)
  }
})

router.post('/:id/edit', auth, async (req, res, next) => {
  console.log(req, '/api/post/:id/edit')
  const { body: { title, contents, fileUrl, id } } = req

  try {
    const modified_post = await Post.findByIdAndUpdate(id,
      { title, contents, fileUrl, date: moment().format('YYYY-MM-DD hh:mm:ss') }, // 바뀔 항목들
      { new: true }
    )

    console.log(modified_post, 'Edit Modified')
    res.redirect(`/api/post/${modified_post.id}`)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

// category
router.get('/category/:categoryName', async (req, res, next) => {
  try {
    const result = await Category.findOne({
      categoryName: { // 이 조건으로 /models/cateogry의 posts에서 찾으라는 뜻
        $regex: req.params.categoryName,
        $options: 'i'
      }
    }, 'posts').populate({ path: 'posts' })

    console.log(result, 'Category Find result')
    res.send(result)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

export default router
