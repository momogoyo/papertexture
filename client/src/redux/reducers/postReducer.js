import {
  POST_LOADING_REQUEST,
  POST_LOADING_RESET,
  POST_LOADING_SUCCESS,
  POST_LOADING_FAILURE,
  POST_WRITE_REQUEST,
  POST_WRITE_SUCCESS,
  POST_WRITE_FAILURE,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_SUCCESS,
  POST_DETAIL_LOADING_REQUEST,
  POST_EDIT_LOADING_REQUEST,
  POST_EDIT_LOADING_SUCCESS,
  POST_EDIT_LOADING_FAILURE,
  POST_EDIT_UPLOADING_REQUEST,
  POST_EDIT_UPLOADING_SUCCESS,
  POST_EDIT_UPLOADING_FAILURE,
  CATEGORY_FIND_REQUEST,
  CATEGORY_FIND_SUCCESS,
  CATEGORY_FIND_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from '../types'

const initialState = {
  isAuthenticated: null,
  posts: [],
  postDetail: '',
  postCount: '',
  loading: false,
  error: '',
  creatorId: '',
  categoryFindResult: '',
  title: '',
  searchBy: '',
  searchResult: ''
}

// export default function (state = initialState, action) {
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    // POST_LOADING
    case POST_LOADING_REQUEST:
      return {
        ...state,
        loading: true
      }

    case POST_LOADING_RESET:
      return {
        ...state,
        posts: [],
        loading: true
      }

    case POST_LOADING_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.postFindResult],
        categoryFindResult: action.payload.categoryFindResult,
        postCount: action.payload.postCount,
        loading: false
      }

    case POST_LOADING_FAILURE:
      return {
        ...state,
        loading: false
      }

      // POST_WRITE
    case POST_WRITE_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true
      }

    case POST_WRITE_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case POST_WRITE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

      // POST_DETAIL_LOADING
    case POST_DETAIL_LOADING_REQUEST:
      return {
        ...state,
        posts: [], // 카드 상세보기를 하고 뒤로가기를 하면 다시 CardList를 불러오는 request를 날리게 된다. 이때 중복을 막기 위해서 빈 배열을 선언해준다.
        loading: true
      }

    case POST_DETAIL_LOADING_SUCCESS:
      return {
        ...state,
        postDetail: action.payload,
        creatorId: action.payload.creator._id,
        title: action.payload.title,
        loading: false
      }

    case POST_DETAIL_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

      // POST_EDIT_LOADING
    case POST_EDIT_LOADING_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true
      }

    case POST_EDIT_LOADING_SUCCESS:
      return {
        ...state,
        postDetail: action.payload,
        loading: false
      }

    case POST_EDIT_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

      // POST_EDIT_UPLOADING
    case POST_EDIT_UPLOADING_REQUEST:
      return {
        ...state,
        loading: true
      }

    case POST_EDIT_UPLOADING_SUCCESS:
      return {
        ...state,
        postDetail: action.payload,
        isAuthenticated: true, // 인증된 사람만 수정 가능
        loading: false
      }

    case POST_EDIT_UPLOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

      // CATEGORY_FIND
    case CATEGORY_FIND_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true
      }

    case CATEGORY_FIND_SUCCESS:
      return {
        ...state,
        categoryFindResult: action.payload,
        loading: false
      }

    case CATEGORY_FIND_FAILURE:
      return {
        ...state,
        categoryFindResult: action.payload,
        loading: false
      }

      // SEARCH
    case SEARCH_REQUEST:
      return {
        ...state,
        posts: [], // Home에서 넘어올 경우 겹치는 것을 방지하기 위해 날려준다.
        searchBy: action.payload, // input 창에서 사용할 state-> 무엇을 검색할 것인지
        loading: true
      }

    case SEARCH_SUCCESS:
      return {
        ...state,
        searchBy: action.payload,
        searchResult: action.payload, // 검색한 값을 받아준다.
        loading: false
      }

    case SEARCH_FAILURE:
      return {
        ...state,
        searchResult: action.payload,
        loading: false
      }

    default:
      return state
  }
}

export default postReducer
