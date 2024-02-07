import React from 'react' // view를 위한 라이브러리
import ReactDOM from 'react-dom' // 브라우저에 렌더링하는 렌더를 가지고 와서 dom을 그려주기 위한 라이브러리
import App from './App'
import loadUser from './components/auth/loadUser'

// React를 로드하기 전에 로그인이 되어있는지 아닌지 한번 더 확인하기
// 새로고침시 로그인 상태 유지하기
loadUser()

ReactDOM.render(<App />, document.getElementById('root'))
