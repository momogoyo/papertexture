import React, { useState, useEffect } from 'react'
import { NavLink, Modal, ModalHeader, ModalBody, Alert, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from '../../redux/types'

// useState: 상태관리
const LoginModal = () => {
  const [modal, setModal] = useState(false) // 모달창이 열려있는지 닫혀있는지 상태를 확인
  const [localMsg, setLocalMsg] = useState('')
  const [form, setValues] = useState({
    email: '',
    password: ''
  })
  const dispatch = useDispatch() // redux hooks 중 하나
  const { errorMsg } = useSelector((state) => state.auth)
  useEffect(() => { // 변화가 있을 때 안의 내용 작동
    try {
      setLocalMsg(errorMsg)
    } catch (e) {
      console.log(e)
    }
  }, [errorMsg]) // errorMsg라는 변화가 있을 때마다 작동한다.
  // 그냥 []으로 두면 한번만 작동

  const handleToggle = () => {
    dispatch({
      type: CLEAR_ERROR_REQUEST
    })

    setModal(!modal) // 모달창 닫아주기
  }

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { email, password } = form
    const user = { email, password }
    console.log(user)
    dispatch({
      type: LOGIN_REQUEST,
      payload: user
    })
  }

  return (
    <div>
      <NavLink onClick={handleToggle} href='#'>
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Login</ModalHeader>
        <ModalBody>
          {localMsg ? <Alert color='danger'>{localMsg}</Alert> : null}
          <Form onSubmit={onSubmit} className='registerForm-wrap'>
            <FormGroup>
              <Label for='email'>Email</Label>
              <Input type='email' name='email' id='email' placeholder='email' onChange={onChange} />
              <Label for='password'>Password</Label>
              <Input type='password' name='password' id='password' placeholder='password' onChange={onChange} />
              <Button className='login-Btn' style={{ marginTop: '2rem' }} block>Login</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default LoginModal
