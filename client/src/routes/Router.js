import React, { Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'
import AppNavbar from '../components/AppNavbar'
import Footer from '../components/Footer'
import Main from './normalRoute/Main'
import About from './normalRoute/About'
import PostCardList from './normalRoute/PostCardList'
import PostWrite from './normalRoute/PostWrite'
import PostDetail from './normalRoute/PostDetail'
import PostEdit from './normalRoute/PostEdit'
import CategoryResult from './normalRoute/CategoryResult'
import Search from './normalRoute/Search'
import Profile from './normalRoute/Profile'
import { EditProtectedRoute, ProfileProtectedRoute } from './protectedRoute/ProtectedRoute'

const MyRouter = () => (
  <>
    <AppNavbar />
    <Header />
    <div id='site-inner'>
      <div className='page-contents'>
        <Switch>
          <Route path='/' exact component={Main} />
          <Route path='/about' exact component={About} />
          <Route path='/products' exact component={PostCardList} />
          <Route path='/post' exact component={PostWrite} />
          <Route path='/post/:id' exact component={PostDetail} />
          <EditProtectedRoute path='/post/:id/edit' exact component={PostEdit} />
          <Route path='/post/category/:categoryName' exact component={CategoryResult} />
          <Route path='/search/:searchTerm' exact component={Search} />
          <ProfileProtectedRoute path='/user/:userName/profile' exact component={Profile} />
          <Redirect from='*' to='/' /> {/* 위의 주소 이외에 다른 모든 주소가 들어오면 홈으로 리다이렉트 */}
        </Switch>
      </div>
    </div>
    <Footer />
  </>
)

export default MyRouter
