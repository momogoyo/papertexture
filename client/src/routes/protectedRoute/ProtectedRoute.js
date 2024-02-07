import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// 주소창에서 직접적인 접근 막기
// 글쓴 사람만 수정이 가능하기 때문에 글쓴이가 아닌 다른 사람이 주소창으로 직접적으로 접근하는 것을 막아야한다.
export const EditProtectedRoute = ({ component: Component, ...rest }) => { // 기존의 component와 나머지 구성요소들을 받아온다.
  const { userId } = useSelector((state) => state.auth)
  const { creatorId } = useSelector((state) => state.post)

  return (
    <Route
      {...rest} render={(props) => {
        if (userId === creatorId) {
          return <Component {...props} />
        } else {
          return (
          // Home으로 보내준다.
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
        }
      }}
    />
  )
}

export const ProfileProtectedRoute = ({ component: Component, ...rest }) => {
  const { userName } = useSelector((state) => state.auth)
  console.log(userName)
  return (
    <Route
      {...rest} render={(props) => {
        if (props.match.params.userName === userName) {
          return <Component {...props} />
        } else {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
        }
      }}
    />
  )
}
