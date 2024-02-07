// 이런 상태(reducers)일 때 어떤 함수를 실행할지를 저장하는 곳

import { all, fork } from 'redux-saga/effects'
import axios from 'axios'

import authSaga from './authSaga'
import postSaga from './postSaga'
import commentSaga from './commentSaga'
import dotenv from 'dotenv'
dotenv.config()

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL

export default function * rootSage () { // function*: (제너레이터 함수)는 여러 값을 반환한다.
  yield all([fork(authSaga), fork(postSaga), fork(commentSaga)])
}
