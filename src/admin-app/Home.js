import React, { Component } from 'react'
import NavBar from './components/adminNav/navBar'
import SideMenu from './components/adminSideMenu/SideMenu'

class Home extends Component {
  render () {
    return (
      <div>
        <SideMenu />
        <NavBar />
      </div>
    )
  }
}

export default Home
