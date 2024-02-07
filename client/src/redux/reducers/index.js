// 로그인 요청 -> 성공 / 실패 일 경우 값을 어떻게 할지 결정해주는 곳

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import authReducer from './authReducer'
import postReducer from './postReducer'
import commentReducer from './commentReducer'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  post: postReducer,
  comment: commentReducer
})

export default createRootReducer
