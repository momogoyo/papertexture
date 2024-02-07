import React from 'react'
import YuJin from '../../assets/images/my.jpeg'

const Profile = () => {
  return (
    <>
      <article className='grid-item about-wrap'>
        <div className='grid-container'>
          <div className='grid-item about-img'>
            <img src={YuJin} alt='현유진' className='image metheduck-front' />
          </div>
          <div className='grid-item about-content'>
            <div className='about-name-wrap'>
              <span>Hyeon Yu Jin</span>
              <span>Front-end Developer</span>
            </div>
            <ul>
              <li>이름: 현유진</li>
              <li>생년월일: 1997.07.02</li>
              <li>직업: 취준생</li>
              <li>
                경력
                <ul>
                  <li>2019.12.24~2020.12.31</li>
                  <li>주)Springcloud WEB Front-end 개발자</li>
                </ul>
              </li>
              <li>관심분야: 프론트엔드, 책, 그림, 예술</li>
              <li>취미: 카페 코딩, 그림 그리기</li>
            </ul>
          </div>
          <div className='grid-item about-detail'>
            <p>학력</p>
          </div>
          <div className='grid-item about-detail'>
            <p>경력</p>
          </div>
          <div className='grid-item about-detail'>
            <p>연락처</p>
          </div>
        </div>
      </article>
      <article className='grid-item the-about'>
        <p>The Profile</p>
      </article>
    </>
  )
}

export default Profile
