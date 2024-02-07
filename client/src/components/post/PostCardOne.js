import React, { Fragment } from 'react'
import { Card, CardImg, CardBody, CardTitle, Badge } from 'reactstrap'
import { Link } from 'react-router-dom'

const PostCardOne = ({ posts }) => {
  return (
    <>
      {Array.isArray(posts)
        ? posts.map(({ _id, title, fileUrl, comments, views }) => {
          return (
            <div key={_id} className='product-card'>
              <Link to={`/post/${_id}`} className='text-dark text-decoration-none'>
                <Card className='p-0'>
                  <CardImg top alt='카드 이미지' src={fileUrl} />
                  <CardBody>
                    <CardTitle className='text-truncate d-flex justify-content-between'>
                      <span className='text-truncate product-title'>{title}</span>
                      <p className='viewCheck'>{views} ✔</p>
                    </CardTitle>
                    <div className='product-info'>
                      <p className='viewContent'>View Content <Badge className='viewContentBadge'>{comments.length}</Badge></p>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </div>
          )
        })
        : ''}
    </>
  )
}

export default PostCardOne
