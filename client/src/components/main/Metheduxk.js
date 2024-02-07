import React from 'react'
import MetheduxkImg from '../../assets/images/intro-methedxck.png'
import { Link } from 'react-router-dom'

const Metheduxk = () => {
  return (
    <>
      <article className='grid-item metheduxk-title'>
        <p className='grid-container'>Who is the <i style={{ textAlign: 'right', fontSize: '3.5rem' }}>Metheduxk?</i></p>
      </article>
      <article className='grid-item metheduxk-profile'>
        <div className='item-header'>
          <img src={MetheduxkImg} alt='미더덕 정면' className='image metheduxk-front' style={{ width: '80%' }} />
        </div>
        <div className='item-body metheduxk-profile-content'>
          <h3 className='title'>Introduce Metheduxk //</h3>
          <p className='title-description'>Metheduxk is always Happy!</p>
        </div>
      </article>
      <article className='grid-item contact-touch'>
        <div className='card-border-wrap'>
          <div className='card-special-border contact-layout'>
            <h3 className='title-description'>CONTACT</h3>
            <div className='item cta-wrap'>
              <div className='cta'>
                <div className='line'>
                  <h4 className='section-heading'>GITHUB</h4>
                  <p className='section-text'>
                    <a href='https://github.com/HyunYuJin' target='_blank' rel='noreferrer'>HyunYuJin</a>
                  </p>
                </div>
                <div className='line'>
                  <h4 className='section-heading'>INSTAGRAM</h4>
                  <p className='section-text'>
                    <a href='https://www.instagram.com/h_yudang/' target='_blank' rel='noreferrer'>h_yudang</a>
                  </p>
                </div>
                <div className='line'>
                  <h4 className='section-heading'>EMAIL</h4>
                  <p className='section-text'>
                    <Link to='#'>gusdbwls9772@gmail.com</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <article className='grid-item article-metheduxk-side1'>
        <p className='title-description'>
          <i>❝ Sometimes it is the people who no one imagines anything of who do the things that no one can imagine. ❞</i>
        </p>
        <p className='title'>In. The Imitation Game...</p>
      </article>
      <article className='grid-item article-metheduxk-side2'>
        <div className='item-body'>
          <section className='item card-main'>
            <div className='cafe_wrap' />
            <div className='item-side'>
              <h3 className='title'>Metheduxk //</h3>
            </div>
            <div className='item-header'>
              <p className='title-description angry-duck'>Angry Duck?</p>
            </div>
            <div className='item-body'>
              <p className='copy copy-card'>
                lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </section>
        </div>
      </article>
    </>
  )
}

export default Metheduxk
