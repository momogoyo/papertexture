import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CLEAR_ERROR_REQUEST, REGISTER_REQUEST } from '../../redux/types'
import { NavLink, Modal, ModalHeader, ModalBody, Alert, Form, FormGroup, Label, Input, Button } from 'reactstrap'

const RegisterModal = () => {
  const [modal, setModal] = useState(false)
  const [form, setValue] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [localMsg, setLocalMsg] = useState('')
  const { errorMsg } = useSelector((state) => state.auth) // Redux의 reduce의 index.js의 auth

  const dispatch = useDispatch()
  const handleToggle = () => {
    dispatch({
      type: CLEAR_ERROR_REQUEST
    })
    setModal(!modal)
  }
  useEffect(() => {
    try {
      // errorMsg가 변할 경우 값이 변경
      setLocalMsg(errorMsg)
    } catch (e) {
      console.log(e)
    }
  }, [errorMsg])

  const onChange = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // 다 작성하고 서버로 전송
  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password } = form
    const newUser = { name, email, password }
    console.log('newUser: ', newUser)
    dispatch({
      type: REGISTER_REQUEST,
      payload: newUser // 넘겨주는 값
    })
  }

  // 프리젠터 내보내 줄 값
  return (
    <div>
      <NavLink onClick={handleToggle} href='#'>
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader>Register</ModalHeader>
        <ModalBody>
          {localMsg ? <Alert color='danger'>{localMsg}</Alert> : null}
          <Form onSubmit={onSubmit} className='loginForm-wrap'>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input type='text' name='name' id='name' placeholder='Name' onChange={onChange} />
              <Label for='email'>Email</Label>
              <Input type='email' name='email' id='email' placeholder='Email' onChange={onChange} />
              <Label for='password'>Password</Label>
              <Input type='password' name='password' id='password' placeholder='Password' onChange={onChange} />
              <Button className='register-Btn' style={{ marginTop: '2rem' }} block>Register</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default RegisterModal
