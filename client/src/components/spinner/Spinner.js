import React, { Fragment } from 'react'
import { Row, Spinner, Button } from 'reactstrap'

// 모든 사이트에서 사용할 것이기 때문에 모듈화를 한다.

export const GrowingSpinner = (
  <>
    <Row className='d-flex justify-content-center m-5'>
      <Button className='spinner-wrap' disabled>
        <Spinner as='span' animation='grow' size='sm' role='status' aria-hidden='true' className='spinner1' />
                &nbsp; 🐣🐥🐥
      </Button>
    </Row>
  </>
)
