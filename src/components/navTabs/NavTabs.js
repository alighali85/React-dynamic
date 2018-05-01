import React, { Component } from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import './nav-tabs.scss'

class NavTabs extends Component {
  render () {
    return (
      <div className='nav-tabs-container hidden-xs'>
        <Nav bsStyle='pills' onSelect={(e) => this.handleSelect(e)} xs-hidden>
          <NavItem eventKey={1} href='/home'>
            اتصل بنا
          </NavItem>
          <NavItem eventKey={1} href='/home'>
            القسم ١
          </NavItem>
          <NavItem eventKey={1} href='/home'>
            القسم ٢
          </NavItem>
          <NavItem eventKey={2} title='Item'>
            الأخبار
          </NavItem>
          <NavItem eventKey={3}>
           بث مباشر
          </NavItem>
        </Nav>
      </div>
    )
  }
}

export default NavTabs
