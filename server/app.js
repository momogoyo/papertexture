import express from 'express'
import mongoose from 'mongoose'
import config from './config'
import hpp from 'hpp'
import helmet from 'helmet'
import cors from 'cors'
import path from 'path'

// Routes
import postsRoutes from './routes/api/post'
import userRoutes from './routes/api/user'
import authRoutes from './routes/api/auth'
import searchRoutes from './routes/api/search'

import morgan from 'morgan'

const app = express()
const { MONGO_URI } = config

const prod = process.env.NODE_ENV === 'production'

// 서버의 보안적인 측면을 보완해주는 라이브러리
app.use(hpp())
// app.use(helmet());
app.use(helmet({ contentSecurityPolicy: false }))

// cors: 브라우저가 다른 도메인이나 포트가 다른 서버에 자원을 요청하도록 해준다.
// SPA에서는 서버에서 설정을 해준다.
// origin: 허락하고자 하는 주소 (true: 모두 허용), credentials: true - 지금 설정한 cors를 브라우저 헤더에 추가한다는 뜻
app.use(cors({ origin: true, credentials: true }))
app.use(morgan('dev')) // 개발할 때 로그를 확인할 수 있도록 해준다.

// 라우터를 사용하면 body-parser를 사용하게 된다.
// 서버에서는 body의 내용을 해석하는 미들웨어가 필요하다.
// 예전에는 body-parser를 많이 사용했는데, express에는 내장되어 있기 때문에 이것들 사용
app.use(express.json()) // 브라우저에 내용을 보내면 서버에서 json 형태로 해석해준다.

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log('MongoDB connecting Success!!'))
  .catch((e) => console.log(e))

// User Router
// app.get('/');
app.use('/api/post', postsRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/search', searchRoutes)

if (prod) {
  app.use(express.static(path.join(__dirname, '../client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
  })
}

export default app
