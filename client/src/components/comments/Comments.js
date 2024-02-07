import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { COMMENT_UPLOADING_REQUEST, COMMENT_LOADING_REQUEST } from '../../redux/types'
import { Form, FormGroup, Input, Button, Row } from 'reactstrap'

const Comments = ({ id, userName, userId }) => {
  const dispatch = useDispatch()
  const [form, setValues] = useState({ contents: '' })

  const onSubmit = async (e) => {
    await e.preventDefault() // refresh를 막아준다.
    const { contents } = form // form에서 값을 빼내준다.
    const token = localStorage.getItem('token') // 오로직 인증된 사람만 댓글 허용하도록 token 값을 가져온다.
    const body = { contents, token, id, userId, userName }
    console.log(body)

    dispatch({
      type: COMMENT_UPLOADING_REQUEST,
      payload: body
    })

    // 제출하고나서 댓글 입력폼을 빈값으로 만들어준다.
    resetValue.current.value = ''
    setValues('')
  }

  const resetValue = useRef(null) // useRef(): 직접 돔에 접근하기 위해서

  const onChange = (e) => {
    setValues({ // 쓴 내용을 바로바로 저장한다.
      ...form,
      [e.target.name]: e.target.value
    })

    // console.log(form.contents);
  }

  useEffect(() => {
    dispatch({
      type: COMMENT_LOADING_REQUEST,
      payload: id
    })
  }, [dispatch, id])

  return (
    <>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Row className='comment-wrap'>
            <div className='comment-title'>Make Comment</div>
            <Input innerRef={resetValue} type='textarea' name='contents' id='contents' onChange={onChange} placeholder='Comment' />
            <Button block className='comment-btn'>Submit</Button>
          </Row>
        </FormGroup>
      </Form>
    </>
  )
}

export default Comments
