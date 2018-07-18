import React, { Component } from 'react'
import AppLogo from '../../assest/img/app-logo.svg'
import './app-navbar.scss'
import { APP_NAME_ARABIC } from '../../assest/constants/AppMainContent.js'
import { withRouter } from 'react-router'

class NavBar extends Component {
  render () {
    this.redirectToHome = () => {
      this.props.history.push('/')
    }
    return (
      <div className='row app-navbar'>
        <div className='container'>
          <div className='app-logo-container' onClick={this.redirectToHome}>
            <img src={AppLogo} alt='logo' />
            <h2>{APP_NAME_ARABIC}</h2>
          </div>
          <div>
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NavBar)
