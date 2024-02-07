import React, { Fragment, useState, useCallback, useEffect } from 'react'
import { Navbar, Container, NavbarToggler, Collapse, Nav, NavItem, Form, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LOGOUT_REQUEST, POST_WRITE_REQUEST } from '../redux/types'
import LoginModal from '../components/auth/LoginModal'
import RegisterModal from '../components/auth/RegisterModal'

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, user, userRole } = useSelector((state) => state.auth)
  console.log(userRole, 'UserRole')

  const dispatch = useDispatch()

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST
    })
  }, [dispatch])

  useEffect(() => {
    setIsOpen(false)
  }, [user])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const addPostClick = () => {
    dispatch({
      type: POST_WRITE_REQUEST
    })
  }

  const authLink = (
    <>
      <NavItem>
        {userRole === 'MainJuin'
          ? (
            <Form className='col mt-2'>
              <Link to='/post' className='btn px-3' onClick={addPostClick}>
                ✎ Post
              </Link>
            </Form>
            )
          : (
              ''
            )}
      </NavItem>
      <NavItem className='d-flex justify-content-center'>
        <Form className='col mt-2'>
          {user && user.name
            ? (
              <Link to={`/user/${user.name}/profile`}>
                <Button color='#858086' className='px-3'>
                  <strong>{user ? `Welcome ${user.name}` : ''} ☺</strong>
                </Button>
              </Link>
              )
            : (
              <Button color='#858086' className='px-3'>
                <strong>No User ☹</strong>
              </Button>
              )}
        </Form>
      </NavItem>
      <NavItem>
        <Form className='col'>
          <Link onClick={onLogout} to='#' className=''>
            <Button color='#858086' className='mt-2'>Logout ⇲</Button>
          </Link>
        </Form>
      </NavItem>
    </>
  )

  const guestLink = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  )

  return (
    <>
      <Navbar color='#858086' expand='lg' className='sticky-top nav-style'>
        <Container fluid>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            {/* <SearchInput isOpen={isOpen} /> */}
            <Nav className='ml-auto d-felx justify-content-around' navbar>{isAuthenticated ? authLink : guestLink}</Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default AppNavbar
