// global
import React, { Component } from 'react'
import NavBar from './components/adminNav/navBar'
import { Grid } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import AdminWelcome from './components/adminWelcome/AdminWelcome'
import Categories from './components/categories/Categories'
import Pages from './components/pages/Pages'
import './styleB.scss'
import ROUTES from './constants/routes'
import PhotosLibrary from './components/photosLibraray/PhotosLibrary'
import VideosLibrary from './components/videosLibrary/VideosLibrary'
import ListtWithIcons from './components/elements/ListWithIcons'

class Home extends Component {
  render () {
    return (
      <Grid fluid className='admin__app-homepage'>

        <div className='admin__app-homepage--body'>
          <div className='nav-bar'>
            <NavBar />
          </div>

          <div className='content'>
            <Grid>
              <Route exact path='/admin-app' component={AdminWelcome} />
              <Route exact path='/admin-app/Categories' component={Categories} />
              <Route exact path='/admin-app/pages' component={Pages} />
              <Route exact path='/admin-app/pictuers' component={PhotosLibrary} />
              <Route exact path='/admin-app/videos' component={VideosLibrary} />
            </Grid>
          </div>

        </div>
        <div className='admin__app-homepage--side-menu'>
          <div className='header'>
        موقع البصيرة
          </div>
          <div className='body'>
            <ListtWithIcons listSource={ROUTES} />
          </div>
        </div>

      </Grid>

    )
  }
}

/* Required Parts :
1- homepage
2- main parts
3- pages
4- pictuers library
5- videos
6- add setting : contains the ap variables (name, title, url, whatsapp nummber, email, facebook, twitter, youtube)
7- userse
8- analytics
*/

export default Home
