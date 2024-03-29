import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, CLEAR_ERROR_REQUEST, CLEAR_ERROR_SUCCESS, CLEAR_ERROR_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE, USER_LOADING_REQUEST, USER_LOADING_SUCCESS, USER_LOADING_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, PASSWORD_EDIT_UPLOADING_REQUEST, PASSWORD_EDIT_UPLOADING_SUCCESS, PASSWORD_EDIT_UPLOADING_FAILURE } from '../types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: '',
  userId: '',
  userName: '',
  userRole: '',
  errorMsg: '',
  successMsg: '',
  previousMatchMsg: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        errorMsg: '',
        isLoading: true // 로그인을 하는 과정이므로 스피너 표시
      }

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state, // state가 기존의 것을 복사해오고
        ...action.payload, // 그다음에 변화시키고 싶은 값을 써준다.
        isAuthenticated: true,
        isLoading: false, // 로그인 성공했기 때문에 스피너 없애기
        userId: action.payload.user.id,
        userRole: action.payload.user.role,
        errorMsg: ''
      }

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
      localStorage.removeItem('token')
      return {
        ...state,
        ...action.payload,
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        errorMsg: action.payload.data.msg
      }

      // LOGOUT
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token')
      return {
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        errorMsg: ''
      }

      // USER_LOADING
    case USER_LOADING_REQUEST:
      return {
        ...state,
        isLoading: true
      }

    case USER_LOADING_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        userId: action.payload._id,
        userName: action.payload.name,
        userRole: action.payload.role
      }

    case USER_LOADING_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: ''
      }

      // PASSWORD_EDIT_UPLOADING
    case PASSWORD_EDIT_UPLOADING_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case PASSWORD_EDIT_UPLOADING_SUCCESS:
      console.log(action.payload.data.success_msg, 'PASSWORD_EDIT_UPLOADING_SUCCESS success_msg')
      return {
        ...state,
        isLoading: false,
        successMsg: action.payload.data.success_msg,
        errorMsg: '',
        previousMsg: ''
      }
    case PASSWORD_EDIT_UPLOADING_FAILURE:
      console.log(action.payload.data.fail_msg, 'PASSWORD_EDIT_UPLOADING_FAILURE fail_msg')
      console.log(action.payload.data.match_msg, 'PASSWORD_EDIT_UPLOADING_FAILURE match_msg')
      return {
        ...state,
        isLoading: false,
        successMsg: '',
        errorMsg: action.payload.data.fail_msg,
        previousMatchMsg: action.payload.data.match_msg
      }

      // CLEAR_ERROR
      // errorMsg가 있는 상태에서 모달 창을 닫을 경우
      // 에러를 표시하는 공간을 오로직 errorMsg만 사용할 것이기 때문에 다음 설정이 필요하다.
    case CLEAR_ERROR_REQUEST:
      return {
        ...state
      }
    case CLEAR_ERROR_SUCCESS:
      return {
        ...state,
        errorMsg: '',
        previousMatchMsg: ''
      }
    case CLEAR_ERROR_FAILURE:
      return {
        ...state,
        errorMsg: 'Clear Error Fail',
        previousMatchMsg: 'Clear Error Fail'
      }

    default:
      return state
  }
}

export default authReducer
