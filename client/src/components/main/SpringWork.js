import React from 'react'
import { Link } from 'react-router-dom'

const SpringWork = () => {
  return (
    <>
      <article className='grid-item'>
        <Link to='/post/60324937d8cb3d05d4b62885' className='text-dark text-decoration-none'>
          <div className='item-body'>
            <div className='image-wrap image-wrap-1' />
            <div className='article-title-wrap'>
              <h3 className='title'>Tasio</h3>
              <div className='read-more'>
                <span className='article-number'>⇒</span>
              </div>
            </div>
          </div>
          <div className='item-footer'>
            <p className='copy'>
              온디맨드 서비스를 제공하는 타시오는 자율주행 셔틀을 호출할 수 있는 웹 앱 서비스입니다.
              해당 서비스 지역은 군산, 대구, 세종, 상암 총 4개의 지역으로 사용자는 선택한 지역에 따라 인원수 및 출발지, 도착지를 선택 후 결제를 진행하며 셔틀버스를 이용할 수 있는 서비스 입니다.
              결제 모듈은 아임포트의 KG 모빌리언스 사를 이용했으며 셔틀버스 호출 및 취소 기능은 Web Socket을 사용하여 구현하였습니다.
            </p>
          </div>
        </Link>
      </article>
      <article className='grid-item'>
        <Link to='/post/6033d1200182bf04d92d77be' className='text-dark text-decoration-none'>
          <div className='item-body'>
            <div className='image-wrap image-wrap-2' />
            <div className='article-title-wrap'>
              <h3 className='title'>Only One GoGunsan</h3>
              <div className='read-more'>
                <span className='article-number'>⇒</span>
              </div>
            </div>
          </div>
          <div className='item-footer'>
            <p className='copy'>
              군산시와 함께 진행한 서비스로 서비스 명은 온리원 고군산 자율주행 셔틀입니다.
              이 프로젝트는 온스케줄 웹 앱 서비스로, 대부분의 기능은 타시오와 비슷하지만 결제 모듈을 제외하여 사용자가 무료로 서비스를 이용할 수 있습니다.
              또한 지도에서 정류장을 선택할 수 있도록 하여 사용자에게 더 편안한 UX를 제공할 수 있도록 추가 구현하였습니다.
            </p>
          </div>
        </Link>
      </article>
      <article className='grid-item'>
        <Link to='/post/6033d2980182bf04d92d77bf' className='text-dark text-decoration-none'>
          <div className='item-body'>
            <div className='image-wrap image-wrap-3' />
            <div className='article-title-wrap'>
              <h3 className='title'>Unmanned post office</h3>
              <div className='read-more'>
                <span className='article-number'>⇒</span>
              </div>
            </div>
          </div>
          <div className='item-footer'>
            <p className='copy'>
              우정사업본부와 함께 진행한 서비스로 서비스 명은 자율주행 무인우체국입니다.
              이 프로젝트도 마찬가지로 안드로이드 웹 앱을 기반으로 개발되었고 주요 기능은 택배 접수 및 수령 예약 서비스를 제공하는 것입니다.
              고려대학교 세종 캠퍼스에 돌아다니는 셔틀버스는 사용자가 원하는 정류장으로 택배를 신청하면 택배를 신청한 시간에 배송해주는 서비스를 제공합니다.
              도착 10분전과 배송 완료 후 5분 뒤 사용자에게 푸쉬 알림 기능을 제공하여 보다 정확한 서비스를 제공하도록 하였습니다.
            </p>
          </div>
        </Link>
      </article>
    </>
  )
}

export default SpringWork
