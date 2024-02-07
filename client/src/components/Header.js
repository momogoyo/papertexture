import React from 'react'
import { Row, Col, List } from 'reactstrap'
import { Link } from 'react-router-dom'

const Header = () => {
  const thisDate = () => {
    const date = new Date()
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const result = days[date.getDay()] + ', ' + months[date.getMonth()] + ', ' + date.getDate() + ', ' + date.getFullYear()

    return result
  }
  return (
    <header id='site-header'>
      <Row className='header-banner text-center'>
        <Col className='header-logo'>
          <Link to='/' className='text-decoration-none'>
            <div className='logo image' />
          </Link>
        </Col>
        <Col className='header-banner-main'>
          <Link to='/' className='text-decoration-none'>
            <p className='date'>{thisDate()}</p>
            <h1 className='site-title'>YuJin Hyeon</h1>
            <h2 className='site-description'>Web Front-end DEV</h2>
          </Link>
        </Col>
        <Col className='header-location'>
          <Link to='/' className='location text-decoration-none'>INTJ</Link>
        </Col>
      </Row>
      <nav className='main-menu'>
        <List type='unstyled' className='menu'>
          <li className='menu-item'>
            <Link to='/about' className='text-decoration-none'>About</Link>
          </li>
          <li className='menu-item'>
            <Link to='/products' className='text-decoration-none'>Products</Link>
          </li>
          <li className='menu-item'>
            <Link to='/contact' className='text-decoration-none'>Contact</Link>
          </li>
          <li className='menu-item'>
            <Link to='/diary' className='text-decoration-none'>Diary</Link>
          </li>
        </List>
      </nav>
      <div className='header-border' />
    </header>
  )
}

export default Header
