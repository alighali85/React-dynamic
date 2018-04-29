import  React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import './social-media-bar.scss'
import Whatsapp from '../../assest/img/icons/social-media/whatsapp.svg'
import Twitter from '../../assest/img/icons/social-media/twitter.svg'
import Youtube from '../../assest/img/icons/social-media/youtube.svg'
import Facebook from '../../assest/img/icons/social-media/facebook.svg'
import Instagram from '../../assest/img/icons/social-media/instagram.svg'
import SnapChat from '../../assest/img/icons/social-media/snapchat.svg'
import { APP_CTA_SOCILA_MEDIA } from '../../assest/constants/AppMainContent.js'


class SocialMedaibar extends Component {
    render() {
      return (
        <Row className="social-media-bar">
        <div class="app-separator"></div> 
        <Row>
          <h2 className="brand-color text-center">{APP_CTA_SOCILA_MEDIA}</h2>
        </Row>
          <Grid>
            <Row>
              <Col md={2} sm={4} xs={6}>
              <img src={Twitter} alt="twitter" /><br/>
              Twitter
              </Col>
              <Col md={2} sm={4} xs={6}>
              <img src={Youtube} alt="youtube" /><br/>
              Youtube
              </Col>
              <Col md={2} sm={4} xs={6}>
                <img src={Facebook} alt="facebook" /><br/>
                Facebook
              </Col>
              <Col md={2} sm={4} xs={6}>
                <img src={SnapChat} alt="snapchat" /><br/>
                Snapchat
              </Col>
              <Col md={2} sm={4} xs={6}>
                <img src={Instagram} alt="instagram" /><br/>
                Instagram
              </Col>
              <Col md={2} sm={4} xs={6}>
                <img src={Whatsapp} alt="Whatsapp" /><br/>
                Whatsapp
              </Col>
            </Row>
          </Grid>
        </Row>
      )
    }
}
export default SocialMedaibar;