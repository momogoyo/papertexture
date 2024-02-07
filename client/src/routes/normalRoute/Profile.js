import React, { useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CLEAR_ERROR_REQUEST, PASSWORD_EDIT_UPLOADING_REQUEST } from '../../redux/types'
import Helmet from 'react-helmet'
import { Col, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Alert, Button } from 'reactstrap'

const Profile = () => {
  const { userId, errorMsg, successMsg, previousMatchMsg } = useSelector((state) => state.auth)
  const { userName } = useParams()
  const [form, setValues] = useState({
    previousPassword: '',
    password: '',
    rePassword: ''
  })
  const dispatch = useDispatch()
  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    await e.preventDefault()
    const { previousPassword, password, rePassword } = form
    const token = localStorage.getItem('token')
    const body = { password, token, previousPassword, rePassword, userId, userName }

    dispatch({ type: CLEAR_ERROR_REQUEST })
    dispatch({
      type: PASSWORD_EDIT_UPLOADING_REQUEST,
      payload: body
    })
  }

  return (
    <>
      <Helmet title={`Profile | ${userName}님의 프로필`} />
      <Col className='profile-wrap' sm='12' md={{ size: 6, offset: 12 }}>
        <Card>
          <CardHeader className='edit-password-header'>
            <strong>Edit Password</strong>
          </CardHeader>
          <CardBody>
            <Form className='profile-form-flex' onSubmit={onSubmit}>
              <FormGroup>
                <Label for='title' className='mb-2'>기존 비밀번호</Label>
                <Input type='password' name='previousPassword' id='previousPassword' className='edit-form-style form-control mb-2' onChange={onChange} />
                {previousMatchMsg ? (<Alert color='danger'>{previousMatchMsg}</Alert>) : ('')}
              </FormGroup>
              <FormGroup>
                <Label for='title' className='mb-2'>새로운 비밀번호</Label>
                <Input type='password' name='password' id='password' className='edit-form-style form-control' onChange={onChange} />
              </FormGroup>
              <FormGroup>
                <Label for='title' className='mb-2'>비밀번호 확인</Label>
                <Input type='password' name='rePassword' id='rePassword' className='edit-form-style form-control mb-2' onChange={onChange} />
                {errorMsg ? <Alert color='danger'>{errorMsg}</Alert> : ''}
              </FormGroup>
              {successMsg ? <Alert color='success'>{successMsg}</Alert> : ''}
              <Button className='comment-btn'>변경하기</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

export default Profile
