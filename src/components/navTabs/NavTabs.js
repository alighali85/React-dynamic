import React, { Component } from 'react'
import { Nav, DropdownButton, MenuItem } from 'react-bootstrap'
import './nav-tabs.scss'
import { navTabsContent } from './content'
import menuIcon from '../../assest/img/menu.svg'
import closeMenuIcon from '../../assest/img/icons/menu-close.svg'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { NAVBAR_FIXED_TABS_NUMBER } from '../../assest/constants/AppMainContent'
import { withBreakpoints } from 'react-breakpoints'

class NavTabs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSlideMenu: false,
      subContent: navTabsContent[0].content,
      categories: [],
      fixedTabs: [],
      menuTabs: []
    }
  }

  componentDidMount = () => {
    this.getDataFromDb()
  }

  getDataFromDb = () => { 
    const adminAppdatabase = firebase.database()
      const categoriesData = adminAppdatabase.ref().child('Categories')
      categoriesData.on('value', (snap) => {
        var categories = []
        snap.forEach((cat) => {
          categories.push({
            key: cat.key,
            ...cat.val()
          })
        })
        const navTabFixedTabs = categories.slice(0, NAVBAR_FIXED_TABS_NUMBER)
        const navMenuTabs = categories.slice(NAVBAR_FIXED_TABS_NUMBER)
        this.setState({
          categories: categories,
          fixedTabs: navTabFixedTabs,
          menuTabs: navMenuTabs
        })
    })
  }

  inActiveMenue = (e) => {
    this.setState({
      showSubContent: false
    })
  }

  hideSideMenu = () => {
    this.setState({
      showSlideMenu: false
    })
  }
  
  showSideMenu = () => {
    this.setState({
      showSlideMenu: true
    })
  }

  render () {
    const { fixedTabs, menuTabs, categories, showMobileMenu, showSlideMenu } = this.state
    const { breakpoints, currentBreakpoint } = this.props
    const fixedTabToShow = (breakpoints[currentBreakpoint] >= breakpoints.tablet ? fixedTabs : categories)

      const NavBarFixedTabs = fixedTabToShow.map((tab, i) => <Link
      className='navBar-container__item'
      to={`/category/${tab.id}`}
      id={i}
      key={i}
      >
      {tab.name}
      </Link>)

      const NavBarMenudTabs = (breakpoints[currentBreakpoint] >= breakpoints.tablet ? (
        <DropdownButton
          title='المزيد'
          key='MoreMenu'
          id='MoreMenu'
          >
          {menuTabs.map((tab, i) => <Link
            to={`/category/${tab.id}`}
            key={i}
            >
            <MenuItem href={`/category/${tab.id}`} className='navBar-container__item--mobile'>{tab.name}</MenuItem>
            </Link> )
          }
        </DropdownButton>

      ) : null)
    
    return (
      <div  onMouseLeave={this.inActiveMenue}>
        <img src={menuIcon} alt='menu-icon' className='menu-icon visible-xs' onClick={this.showSideMenu} />
          <div className={`${ !showSlideMenu ? 'hide-left' : 'show-menu'} nav-tabs-container`}>
            <Nav bsStyle='pills' 
            className={`${showMobileMenu ? 'showMobileMenu' : 'hideMobileMenu'}${showMobileMenu ? 'showListMobile' : 'hideListMobile'} app-navbar-tabs-list`}>
              <img src={closeMenuIcon}
              alt='menu-close-icon' 
              className='menu-close-icon visible-xs visible-sm' 
              onClick={this.hideSideMenu} 
              />
              {NavBarFixedTabs}{NavBarMenudTabs}
          </Nav>
      </div>
    </div>
    )
  }
}

export default withRouter(withBreakpoints(NavTabs))
