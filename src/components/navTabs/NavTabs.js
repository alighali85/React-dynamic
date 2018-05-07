import React, { Component } from 'react'
import { Nav, NavItem, Grid } from 'react-bootstrap'
import './nav-tabs.scss'
import { navTabsContent } from './content'
import { BREAK_POINTS } from '../../assest/constants/BreakPoints'

class NavTabs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showMenu: false,
      showMenuMobile: false,
      activeKey: 0,
      subTbas: navTabsContent[0].content
    }

    this.activeMenue = (e) => {
      const {id} = e.target
      const screenSize = window.outerWidth
      if (screenSize > BREAK_POINTS.tablet) {
        this.setState({
          subTbas: navTabsContent[id].content,
          showMenu: true
        })
      }
    }

    this.inActiveMenue = (e) => {
      console.log('mouse leving')
      this.setState({
        showMenu: false
      })
      console.log(
        this.state.showMenu
      )
    }
  }
  render () {
    const {subTbas} = this.state
    const subcontent = subTbas.map(item => {
      const imageUrl = item.image
      return (
        <div className='nav-tabs-content-item'>
          <img src={imageUrl} alt='post-title' />
          <div>{item.title}</div>
        </div>
      )
    })

    return (
      <div className='nav-tabs-container' onMouseLeave={this.inActiveMenue}
      >
        <Nav bsStyle='pills' className='app-navbar-tabs-list'>
          { navTabsContent.map((tab, i) =>
            <NavItem
              id={i}
              eventKey={tab.link}
              href={tab.link}
              onMouseOver={this.activeMenue}
            >
              {tab.title}
            </NavItem>
          )
          }
        </Nav>
        <div className={
          `${this.state.showMenu ? 'showList' : 'hideList'}
           ${this.state.showMenuMobile ? 'showListMobile' : 'hideListMobile'} 
           nav-tab-detalis hidden-sm hidden-xs`
        } >
          <Grid>
            {subcontent}
          </Grid>
        </div>
      </div>
    )
  }
}

export default NavTabs
