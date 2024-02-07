import React from 'react'
import { Link } from 'react-router-dom'
import myImage from '../../assets/images/my.jpeg'

const IntroMe = () => {
  return (
    <>
      <article className='grid-item intro-me'>
        <div className='item-header'>
          <img src={myImage} alt='my_img' className='image intro-me' style={{ width: '80%' }} />
        </div>
        <div className='item-body intro-body'>
          <h3 className='title'>INTRODUCE ME //</h3>
          <p className='copy'>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
        <div className='item-footer'>
          <div className='read-more'>
            <Link to='/about'><span className='article-number'>Read more ⥅</span></Link>
          </div>
        </div>
      </article>
      <article className='grid-item intro-job'>
        <h3 className='title'>“Today's Notice”</h3>
        <span style={{ fontSize: '1.5rem' }}>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </span>
      </article>
      <article className='grid-item intro-routine'>
        {/* article-routine */}
        <div className='article-card article-routine routine-table-card'>
          <h3 className='title routine-title'>ROUTINE</h3>
          <div className='my-routine'>
            <div className='tabs'>
              <div className='tab active' data-for='daily'>DAILY</div>
              <div className='tab' data-for='week'>WEEK</div>
            </div>
            <div className='tab-content active' data-target='daily'>
              <div className='tab-content-table'>
                <span className='hours'>7:30am</span>
                <span className='dots' />
                <span className='task'>Wake Up</span>
              </div>
              <div className='tab-content-table'>
                <span className='hours'>8:00am</span>
                <span className='dots' />
                <span className='task'>Breakfast</span>
              </div>
              <div className='tab-content-table'>
                <span className='hours'>8:30am</span>
                <span className='dots' />
                <span className='task'>Jogging</span>
              </div>
              <div className='tab-content-table'>
                <span className='hours'>10:00am</span>
                <span className='dots' />
                <span className='task'>Wash face</span>
              </div>
              <div className='tab-content-table'>
                <span className='hours'>11:00am</span>
                <span className='dots' />
                <span className='task'>Study</span>
              </div>
              <div className='tab-content-table'>
                <span className='hours'>12:30pm</span>
                <span className='dots' />
                <span className='task'>Lunch</span>
              </div>
              <div className='tab-content-table'>
                <span className='hours'>13:30pm</span>
                <span className='dots' />
                <span className='task'>Study</span>
              </div>
              <div className='tab-content-table'>
                <span className='hours'>17:00pm</span>
                <span className='dots' />
                <span className='task'>Dinner</span>
              </div>
              <div className='tab-content-table'>
                <span className='hours'>18:00pm</span>
                <span className='dots' />
                <span className='task'>Shower</span>
              </div>
              <div className='tab-content-table'>
                <span className='hours'>19:00pm</span>
                <span className='dots' />
                <span className='task'>Rest</span>
              </div>
              <div className='tab-content-table'>
                <span className='hours'>20:00pm</span>
                <span className='dots' />
                <span className='task'>Study</span>
              </div>
              <div className='tab-content-table'>
                <span className='hours'>12:30am</span>
                <span className='dots' />
                <span className='task'>Sleep</span>
              </div>
            </div>
            <div className='tab-content' data-target='week'>
              <div className='tab-content-table'>
                <span className='date'>Monday</span>
                <span className='dots' />
                <span className='task'>Algorithum</span>
              </div>
              <div className='tab-content-table'>
                <span className='date'>Tuesday</span>
                <span className='dots' />
                <span className='task'>Front-end</span>
              </div>
              <div className='tab-content-table'>
                <span className='date'>Wednesday</span>
                <span className='dots' />
                <span className='task'>Create Blog</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default IntroMe
