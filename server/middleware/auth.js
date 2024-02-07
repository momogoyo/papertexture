import jwt from 'jsonwebtoken'
import config from '../config/index'
const { JWT_SECRET } = config

// 토큰을 가져오게되면 토큰을 해석해서 req.user와 해석된 값이 같다면 다음으로 넘어가는 방식
const auth = (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ msg: '토큰 없음. 인증 거부.' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) // 토큰이 있다면 토큰 해석(Decode)
    req.user = decoded // 요청한 유저와 같으면
    next() // 다음으로 넘어간다.
  } catch (e) {
    console.log(e)
    res.status(400).json({ msg: '토큰이 유효하지 않습니다.' }) // 토큰이 있는데 에러가 나는 이유는 토큰이 유효하지 않기 때문이다.
  }
}

export default auth
