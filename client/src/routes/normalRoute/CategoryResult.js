import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CATEGORY_FIND_REQUEST } from '../../redux/types'
import PostCardOne from '../../components/post/PostCardOne'

const CategoryResult = () => {
  const dispatch = useDispatch()
  const { categoryName } = useParams()
  const { categoryFindResult } = useSelector((state) => state.post)

  console.log(categoryName, 'categoryName')
  console.log(categoryFindResult, 'categoryFindResult')

  useEffect(() => {
    dispatch({
      type: CATEGORY_FIND_REQUEST,
      payload: categoryName
    })
  }, [dispatch, categoryName])

  return (
    <section className='grid-container categoryResultWrap'>
      <h2 className='categoryName'>Category: <span>'{categoryName}'</span></h2>
      <article className='grid-item cardListWrap'>
        <PostCardOne className='grid-item' posts={categoryFindResult.posts} />
      </article>
    </section>
  )
}

export default CategoryResult
