import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import './app-footer.scss'
import SocialMedaibarSmall from '../socialMediaBar/SocialMediaBarSmall'
import CopyRight from '../copyRight/CopyRight.js'

class AppFooter extends Component {
  render () {
    return (
      <Row className='app-footer'>
        <div class='container'>
          <Row className='show-grid'>
            <SocialMedaibarSmall />
          </Row>
          <CopyRight align='center' />
        </div>
      </Row>
    )
  }
}
export default AppFooter
