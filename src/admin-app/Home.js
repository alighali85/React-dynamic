import React, { Component } from 'react'
import NavBar from './components/adminNav/navBar'
import SideMenu from './components/adminSideMenu/SideMenu'
import userIcon from '../../src/admin-app/assets/images/user-icon.svg'
import { Image } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import AdminWelcome from './components/adminWelcome/AdminWelcome'
import Categories from './components/categories/Categories'
import './style.scss'

class Home extends Component {
  render () {
    return (
      <div className='admin-app-home'>
        <div className='navigation-area'>
          <SideMenu>
            <h2>
              here iss some text
            </h2>
            <MenuListWithIcos />
          </SideMenu>
        </div>
        <div className='content-area'>
          <Route exact path='/admin-app/home' component={AdminWelcome} />
          <Route exact path='/admin-app/Categories' component={Categories} />
        </div>

        <NavBar />
      </div>
    )
  }
}

const MenuListData = [
  {
    key: 0,
    tilte: 'Categories',
    iconSource: '',
    name: 'الأقسام',
    link: './cartegories/add',
    active: true
  },
  {
    key: 1,
    tilte: '',
    iconSource: '',
    name: 'المستخدمين',
    link: '',
    active: true
  }
]
const MenuListWithIcos = () => <ul>
  {MenuListData.map((item, i) => <li
    key={item.key}>
    <Image src={userIcon} circle className='user-icon' />
    {item.name}
  </li>
  )}
</ul>

export default Home
