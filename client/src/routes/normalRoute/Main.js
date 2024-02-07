import React from 'react'
import { Helmet } from 'react-helmet'
import IntroMe from '../../components/main/IntroMe'
import Metheduxk from '../../components/main/Metheduxk'
import SpringWork from '../../components/main/SpringWork'

const Main = () => {
  return (
    <>
      <Helmet title='Home' />
      <section className='grid-container section1'>
        <IntroMe />
      </section>
      <div className='double-border'>
        <div className='border-1' />
        <div className='border-2' />
      </div>
      <section className='grid-container section2'>
        <Metheduxk />
      </section>
      {/* Double Border */}
      <div className='double-border'>
        <div className='border-1' />
        <div className='border-2' />
      </div>
      <section className='grid-container section3'>
        <SpringWork />
      </section>
    </>
  )
}

export default Main
