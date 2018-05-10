import React, { Component } from 'react'
import { Nav, NavItem, Grid } from 'react-bootstrap'
import './nav-tabs.scss'
import { navTabsContent } from './content'
import { BREAK_POINTS } from '../../assest/constants/BreakPoints'
import menuIcon from '../../assest/img/menu.svg'
import closeMenuIcon from '../../assest/img/icons/menu-close.svg'
import { APP_CONTACT_PHONE, APP_CTA_WHATSAPP, APP_CTA_CALL_US, COPYRIGHT } from '../../assest/constants/AppMainContent.js';

class NavTabs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSlideMenu: false,
      showSubContent: false,
      activeKey: 0,
      subContent: navTabsContent[0].content
    }
  }

  activeMenue = (e) => {
    const {id} = e.target
    const screenSize = window.outerWidth
    if (screenSize > BREAK_POINTS.tablet) {
      this.setState({
        subContent: navTabsContent[id].content,
        showSubContent: true
      })
    }
  }

  inActiveMenue = (e) => {
    console.log('mouse leving')
    this.setState({
      showSubContent: false
    })
    console.log(this.state.showMenu)
  }

  hideSideMenu = () => {
    console.log('show Slide Menu');
    this.setState({
      showSlideMenu: false
    })
  }
  
  showSideMenu = () => {
    console.log('Show slide  menu');
    this.setState({
      showSlideMenu: true
    })
  }

  render () {
    const {subContent} = this.state
    const subcontent = subContent.map(item => {
      const imageUrl = item.image
      return (
        <div className='nav-tabs-content-item'>
          <img src={imageUrl} alt='post-title' />
          <div>{item.title}</div>
        </div>
      )
    })

    return (
      <div  onMouseLeave={this.inActiveMenue}
      >
      <img src={menuIcon} alt='menu-icon' className='menu-icon visible-xs visible-sm' onClick={this.showSideMenu} />
      <div className=
        {`${ !this.state.showSlideMenu ? 'hide-left' : 'show-menu'} nav-tabs-container`}
      >
        <Nav bsStyle='pills' 
          className={
          `${this.state.showMobileMenu ? 'showMobileMenu' : 'hideMobileMenu'}
            ${this.state.showMobileMenu ? 'showListMobile' : 'hideListMobile'} 
            app-navbar-tabs-list` } 
        >
        <img src={closeMenuIcon} alt='menu-close-icon' className='menu-close-icon visible-xs visible-sm' onClick={this.hideSideMenu} />
        
        { navTabsContent.map((tab, i) =>
          <NavItem
          id={i}
          eventKey={tab.link}
          href={tab.link}
          onMouseOver={this.activeMenue}
          >
          {tab.title}
          </NavItem>)
        }
        <br/>
        <a type="tel" href={APP_CONTACT_PHONE} className="btn btn-contactUs btn-block visible-xs visible-sm">{APP_CONTACT_PHONE} {APP_CTA_CALL_US}</a>
        <a type="button" className="btn btn-contactUs btn-block visible-xs visible-sm">{APP_CTA_WHATSAPP} {APP_CTA_CALL_US}</a>
          <div className="menu-footer-copyright">
          {COPYRIGHT}
          </div>
          </Nav>
        {/* Sub contant blck */}
        <div className={
          `${this.state.showSubContent ? 'show' : 'hide'}
          nav-tab-detalis hidden-sm hidden-xs`
        } >
        <Grid>
        {subcontent}
        </Grid>
        </div>
        {/* END Sub contant blck */}
      </div>
      </div>
    )
  }
}

export default NavTabs
