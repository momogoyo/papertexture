import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import createRootReducer from './redux/reducers/index'
import rootSaga from './redux/sagas'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()
const initialState = {}
const middlewares = [sagaMiddleware, routerMiddleware(history)]
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // chrome 같은 곳에서 redux로 개발할 때 어떻게 상태가 진행되는지 볼 수 있게 도와주는 개발자 도구
const composeEnhancer = process.env.NODE_ENV === 'production' ? compose : devtools || compose

const store = createStore(
  createRootReducer(history),
  initialState, // web에 모든 상태를 담고 있는 초기값
  composeEnhancer(applyMiddleware(...middlewares))
)

sagaMiddleware.run(rootSaga) // sagaMiddleware 작동시켜주세요.
export default store
