import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { SEARCH_REQUEST } from '../../redux/types'
import PostCardOne from '../../components/post/PostCardOne'

const Search = () => {
  const dispatch = useDispatch()
  const { searchTerm } = useParams()
  const { searchResult } = useSelector((state) => state.post)

  console.log(searchResult)

  useEffect(() => {
    if (searchTerm) {
      dispatch({
        type: SEARCH_REQUEST,
        payload: searchTerm
      })
    }
  }, [dispatch, searchTerm])

  return (
    <div className='searchResultWrap'>
      <h2 className='searchName'>Search: <span>'{searchTerm}'</span></h2>
      <article className='grid-item cardListWrap'>
        <PostCardOne posts={searchResult} />
      </article>
    </div>
  )
}

export default Search
