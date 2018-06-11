import React, { Component } from 'react'
import { Nav, Grid } from 'react-bootstrap'
import './nav-tabs.scss'
import { navTabsContent } from './content'
import menuIcon from '../../assest/img/menu.svg'
import closeMenuIcon from '../../assest/img/icons/menu-close.svg'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class NavTabs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSlideMenu: false,
      showSubContent: false,
      activekey: 0,
      subContent: navTabsContent[0].content,
      navBarTabs: []
    }
  }

  componentDidMount = () => {
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
      this.setState({
        navBarTabs: categories,
      })
    })
  };

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
    const { subContent, navBarTabs } = this.state

    const subcontent = subContent.map((item, i) => {
      const imageUrl = item.image
      return (
        <div className='nav-tabs-content-item' key={i}>
          <img src={imageUrl} alt='post-title' />
          <div>{item.title}</div>
        </div>
      )
    })
    const NavBarTabs = navBarTabs.map((tab, i) =><Link
      className='navBar-container__item'
      to={`/category/${tab.id}`}
      id={i}
      key={tab.key}
      >
      {tab.name}
      </Link>)
    

    return (
      <div  onMouseLeave={this.inActiveMenue}>
        <img src={menuIcon} alt='menu-icon' className='menu-icon visible-xs visible-sm' onClick={this.showSideMenu} />
          <div className={`${ !this.state.showSlideMenu ? 'hide-left' : 'show-menu'} nav-tabs-container`}>
            <Nav bsStyle='pills' className={`${this.state.showMobileMenu ? 'showMobileMenu' : 'hideMobileMenu'}${this.state.showMobileMenu ? 'showListMobile' : 'hideListMobile'} app-navbar-tabs-list` }>
              <img src={closeMenuIcon} alt='menu-close-icon' className='menu-close-icon visible-xs visible-sm' onClick={this.hideSideMenu} />
            <br/>
            {NavBarTabs} 
          </Nav>
          <div className={`${this.state.showSubContent ? 'show' : 'hide'} nav-tab-detalis hidden-sm hidden-xs`} >
          <Grid>
          {subcontent}
          </Grid>
        </div>
      </div>
    </div>
    )
  }
}

export default withRouter(NavTabs)
