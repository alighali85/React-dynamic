import React, { Component } from 'react'
import { Row, Col, Grid } from 'react-bootstrap'
import './app-footer.scss'
import SocialMedaibarSmall from '../socialMediaBar/SocialMediaBarSmall'
import CopyRight from '../copyRight/CopyRight.js'
import NavList from '../../components/navList/navList.js'

class AppFooter extends Component {
  render () {
    return (
      <Row className='app-footer'>
        <Grid>
          <Row>
            <Col md={4} sm={4} xs={12}>
              <NavList />
            </Col>
            <Col md={4} sm={4} xs={12}>
              <NavList />
            </Col>
            <Col md={4} sm={4} xs={12}>
              <NavList />
            </Col>
          </Row>
          <Row className='show-grid'>
            <SocialMedaibarSmall />
          </Row>
          <CopyRight align='center' />
        </Grid>
      </Row>
    )
  }
}
export default AppFooter
