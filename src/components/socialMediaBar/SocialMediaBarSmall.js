import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import './social-media-bar-small.scss'
import Whatsapp from '../../assest/img/icons/social-media/whatsapp.svg'
import Twitter from '../../assest/img/icons/social-media/twitter.svg'
import Youtube from '../../assest/img/icons/social-media/youtube.svg'
import Facebook from '../../assest/img/icons/social-media/facebook.svg'
import Instagram from '../../assest/img/icons/social-media/instagram.svg'
import SnapChat from '../../assest/img/icons/social-media/snapchat.svg'
import { APP_CTA_SOCILA_MEDIA, APP_CONTACT_PHONE } from '../../assest/constants/AppMainContent.js'

class SocialMedaibarSmall extends Component {
  render () {
    return (
      <Row className='social-media-bar-small'>
        <div className='app-separator' />
        <Row>
          <h3 className='brand-color text-center'>{APP_CTA_SOCILA_MEDIA}</h3>
          <h3 className='brand-color text-center'>{APP_CONTACT_PHONE}</h3>
          <br />
        </Row>
        <Grid>
          <Row>
            <Col mdOffset={3} md={1}xs={2}>
              <img src={Twitter} alt='twitter' /><br />
            </Col>
            <Col md={1}xs={2}>
              <img src={Youtube} alt='youtube' /><br />
            </Col>
            <Col md={1}xs={2}>
              <img src={Facebook} alt='facebook' /><br />
            </Col>
            <Col md={1}xs={2}>
              <img src={SnapChat} alt='snapchat' /><br />
            </Col>
            <Col md={1}xs={2}>
              <img src={Instagram} alt='instagram' /><br />
            </Col>
            <Col md={1}xs={2}>
              <img src={Whatsapp} alt='Whatsapp' /><br />
            </Col>
          </Row>
        </Grid>
      </Row>
    )
  }
}

export default SocialMedaibarSmall
