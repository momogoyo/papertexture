import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Badge } from 'reactstrap'

const Categroy = ({ posts }) => {
  // console.log(posts);
  return (
    <>
      {Array.isArray(posts) ? posts.map(({ _id, categoryName, posts }) => ( // post가 배열이라면 실행
        <div key={_id} className='myCategory'>
          <Link to={`/post/category/${categoryName}`} className='text-dark text-decoration-none'>
            <span className='mr-1'>
              <Button className='categoryBtn categoryMenu'>
                <span># {categoryName}</span>
                        &nbsp;
                <Badge className='categoryBadge'>{posts.length}</Badge>
              </Button>
            </span>
          </Link>
        </div>
      )) : ''}
    </>
  )
}

export default Categroy
