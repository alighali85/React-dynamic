// global
import React, { Component } from 'react'
import NavBar from './components/adminNav/navBar'
import SideMenu from './components/adminSideMenu/SideMenu'
import { Breadcrumb, Grid, Col } from 'react-bootstrap'
import { Route, Link } from 'react-router-dom'
import AdminWelcome from './components/adminWelcome/AdminWelcome'
import Categories from './components/categories/Categories'
import Pages from './components/pages/Pages'
import './style.scss'
import ROUTES from './constants/routes'
import FontAwesome from 'react-fontawesome'
import PhotosLibrary from './components/photosLibraray/PhotosLibrary'


class Home extends Component {
  render () {
    return (
      <div className='admin-app-home'>
      
        <div className='navigation-area'>
          <SideMenu>
            <MenuListWithIcos />
          </SideMenu>
        </div>

        <div className='content-area'>
          <Grid>
            <Col md={10} mdOffset={1}>
              <Breadcrumb>
                <Breadcrumb.Item href='#'>Home</Breadcrumb.Item>
                <Breadcrumb.Item href='#'>Library</Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
              </Breadcrumb>
              <Route exact path='/admin-app' component={AdminWelcome} />
              <Route exact path='/admin-app/Categories' component={Categories} />
              <Route exact path='/admin-app/pages' component={Pages} />
              <Route exact path='/admin-app/pictuers' component={PhotosLibrary} />
            </Col>
          </Grid>

        </div>

        <NavBar />
      </div>
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
const MenuListWithIcos = () => <ul>
  {ROUTES.map((item, i) => <li key={item.key}>
    <Link to={item.link}>
      <FontAwesome name={item.iconSource} size='2x' />
      <h4 style={{display: 'inline', marginRight: '14px'}}>{item.name} </h4>
    </Link>

  </li>
  )}
</ul>

export default Home
