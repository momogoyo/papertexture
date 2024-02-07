import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { POST_LOADING_REQUEST, POST_LOADING_RESET } from '../../redux/types'
import { Helmet } from 'react-helmet'
import { Alert } from 'reactstrap'
import { GrowingSpinner } from '../../components/spinner/Spinner'
import PostCardOne from '../../components/post/PostCardOne'
import Category from '../../components/post/Category'
import SearchInput from '../../components/search/searchInput'

const PostCardList = () => {
  const { posts, categoryFindResult, loading, postCount } = useSelector((state) => state.post)
  const [isOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: POST_LOADING_RESET,
      payload: 0
    })
  }, [dispatch])

  useEffect(() => {
    dispatch({
      type: POST_LOADING_REQUEST,
      payload: 0 // 0부터 시작해서 6개씩 차감
    })
  }, [dispatch])

  /// ///////////////////////////////////////////////////////////////////////////////////////////////
  const skipNumberRef = useRef(0) // 전 생에 주기에서 유일하게 살아남을 수 있다. 초기 값은 0
  const postCountRef = useRef(0)
  const endMsg = useRef(false) // useEffect랑 callBack에서도 값을 저장할 수 있다.
  postCountRef.current = postCount - 6

  // Custom Hooks
  const useOnScreen = (options) => {
    const lastPostElementRef = useRef()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setVisible(entry.isIntersecting)

        if (entry.isIntersecting) {
          const remainPostCount = postCountRef.current - skipNumberRef.current
          if (remainPostCount >= 0) {
            dispatch({
              type: POST_LOADING_REQUEST,
              payload: skipNumberRef.current + 6
            })
            skipNumberRef.current += 6
          } else {
            endMsg.current = true
          }
        }
      }, options)

      if (lastPostElementRef.current) {
        observer.observe(lastPostElementRef.current)
      }

      const LastElementReturnFunc = () => {
        if (lastPostElementRef.current) {
          observer.unobserve(lastPostElementRef.current)
        }
      }

      return LastElementReturnFunc
    }, [lastPostElementRef, options])

    return [lastPostElementRef, visible]
  }
  /// ///////////////////////////////////////////////////////////////////////////////////////////////

  // Infinite Scroll은 화면 끝에 걸려야 감지가 되어서 작동을 한다.
  // 화면 크기가 축소된 사람의 경우는 포스트가 없다고 나오기 때문에 threshold 옵션으로 조정해서 자동으로 감지해서 게시물을 불러오도록 한다.
  const [lastPostElementRef, visible] = useOnScreen({
    threshold: '0.5'
  })
  console.log(visible, 'visible', skipNumberRef.current, 'skipNum')

  return (
    <>
      {/* <Helmet title="Home" /> */}
      <Helmet title='PostCardList' />
      <section className='grid-container products-wrap'>
        <article className='grid-item searchWrap'>
          <SearchInput isOpen={isOpen} />
        </article>
        <article className='grid-item categoryWrap'>
          <Category posts={categoryFindResult} />
        </article>
        <article className='grid-item cardListWrap'>
          {posts ? <PostCardOne posts={posts} /> : GrowingSpinner}
        </article>
      </section>

      {/* Infinite Scroll */}
      {/* Intersection observer 익스플로러에서는 작동하지 않는다. */}
      {/* 감지가 될 칸을 만든다. */}
      <div ref={lastPostElementRef}>{loading && GrowingSpinner}</div>
      {/* endMsg가 보이면 div 안의 내용이, 그렇지 않으면 빈 값이 보여진다. */}
      {loading
        ? ('')
        : endMsg
          ? (
            <section className='grid-container loadingMsg-blank'>
              <Alert className='no-productsMsg text-center'>
                No More Products
              </Alert>
            </section>
            )
          : ('')}
    </>
  )
}

export default PostCardList
