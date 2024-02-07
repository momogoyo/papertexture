import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import Profile from '../../components/about/Profile'

const Main = () => {
  return (
    <>
      <Helmet title='About' />
      <section className='grid-container about1'>
        <Profile />
      </section>
    </>
  )
}

export default Main
