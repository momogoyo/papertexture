import React from 'react'
import { Row, Col } from 'reactstrap'

const Footer = () => {
  const thisYear = () => {
    const year = new Date().getFullYear()
    return year
  }

  return (
    <div id='site-footer' className='text-center'>
      <Row className='footer-items'>
        <Col>&copy; <span>{thisYear()}</span> HYEON YU JIN &nbsp; | &nbsp; Republic of Korea</Col>
      </Row>
    </div>
  )
}

export default Footer
