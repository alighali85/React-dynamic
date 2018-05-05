import React, { Component } from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import './nav-tabs.scss'

class NavTabs extends Component {
  render () {
    return (
      <div className='nav-tabs-container hidden-xs hidden-sm'>
        <Nav bsStyle='pills' className='app-navbar-tabs-list' xs-hidden >
          <NavItem eventKey={1} href='/home'>
          جلب الحبيب
          </NavItem>
          <NavItem eventKey={1} href='/home'>
          علاج العقم عن طريق الأعشاب
          </NavItem>
          <NavItem eventKey={1} href='/home'>
          خلطات الزوجية
          </NavItem>
          <NavItem eventKey={2} title='Item'>
          أحجار روحانية
          </NavItem>
        </Nav>
      </div>
    )
  }
}

export default NavTabs
