import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { POST_DETAIL_LOADING_REQUEST, POST_DELETE_REQUEST, USER_LOADING_REQUEST } from '../../redux/types'
import { Button, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import BalloonEditor from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor'
import { GrowingSpinner } from '../../components/spinner/Spinner'
import { editorConfiguration } from '../../components/editor/EditorConfig'
// import Comments from "../../components/comments/Comments";

const PostDetail = (req) => {
  const dispatch = useDispatch()
  const { postDetail, creatorId, title, loading } = useSelector((state) => state.post)
  const { userId, userName } = useSelector((state) => state.auth)
  // const { comments } = useSelector((state) => state.comment); // reducers/index.js에 comment로 선언해주었고 그 안에 initialState에 comments로 써줌
  console.log(req)

  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id
    })

    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem('token')
    })
  }, [dispatch, req.match.params.id]) // (주의: []를 안넣어주면 무한반복이 된다!)

  // 글쓴 사람만이 글을 지울 수 있다.
  const onDeleteClick = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: req.match.params.id,
        token: localStorage.getItem('token')
      }
    })
  }

  const EditButton = (
    <>
      <Row className='post-options-wrap'>
        <Col className='option-btn'>
          <Link to='/products' className='backBtn'>Back</Link>
        </Col>
        <Row className='option-btn post-modify-wrap'>
          <Col>
            <Link to={`/post/${req.match.params.id}/edit`} className='editBtn'>Edit</Link>
          </Col>
          <Col>
            <Button className='deleteBtn' onClick={onDeleteClick}>Delete</Button>
          </Col>
        </Row>
      </Row>
    </>
  )

  const HomeButton = (
    <>
      <Row className='post-options-wrap'>
        <Col className='option-btn'>
          <Link to='/products' className='backBtn'>Back</Link>
        </Col>
      </Row>
    </>
  )

  const Body = (
    <>
      {userId === creatorId ? EditButton : HomeButton}
      <Row className='post-info-wrap'>
        {
                    (() => {
                      if (postDetail && postDetail.creator) {
                        return (
                          <>
                            <div className='post-category-title'>
                              <span className='mr-3'>
                                <Button className='categoryBtn p-2'>{postDetail.category.categoryName}</Button>
                              </span>
                              {postDetail.title}
                            </div>
                            <div className='post-writer'>{postDetail.creator.name}</div>
                          </>
                        )
                      }
                    })()
                }
      </Row>
      {postDetail && postDetail.comments ? (
        <>
          <div className='post-detail-date'>
            <span>{postDetail.date}</span>
                    &nbsp;
            <span>♙ {postDetail.comments.length}</span>
                    &nbsp;
            <span>✓ {postDetail.views}</span>
          </div>
          <Row className='mb-3'>
            <CKEditor editor={BalloonEditor} data={postDetail.contents} config={editorConfiguration} disabled='true' />
          </Row>
          {/* <Row className="mt-5">
                    <div className="mb-3 border border-blue rounded comment-total-wrap">
                        { Array.isArray(comments) ? comments.map(({ contents, creator, date, _id, creatorName }) => (
                            <div key={_id} className="contents-wrap">
                                <Row className="justify-content-between p-2">
                                    <div className="content-creator">{creatorName ? creatorName : creator}</div>
                                    <div className="text-small">
                                        <span className="font-weight-bold"> { date.split(" ")[0] }</span>
                                        <span className="font-weight-light">{" "}{date.split(" ")[1]}</span>
                                    </div>
                                </Row>
                                <Row className="contents-content p-2">
                                    <div>{ contents }</div>
                                </Row>
                                <hr />
                            </div>
                        )) : "Creator" }
                        <Comments id={req.match.params.id} userId={userId} userName={userName}/>
                    </div>
                </Row> */}
        </>
      ) : (<h1>hi</h1>)}
    </>
  )

  return (
    <div className='post-detail-wrap'>
      <Helmet title={`Post | ${title}`} />
      {loading === true ? GrowingSpinner : Body}
    </div>
  )
}

export default PostDetail
