import  React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './social-media-bar.scss';
import Whatsapp from '../../assest/img/icons/social-media/whatsapp.svg'
import Twitter from '../../assest/img/icons/social-media/twitter.svg'
import Youtube from '../../assest/img/icons/social-media/youtube.svg'
import Facebook from '../../assest/img/icons/social-media/facebook.svg'
import Instagram from '../../assest/img/icons/social-media/instagram.svg'

class SocialMedaibar extends Component {
    render() {
      return (
        <Row className="social-media-bar"> 
          <Grid>
            <Row>
              <Col md={2}>
                <img src={Whatsapp} alt="Whatsapp" /><br/>
                Whatsapp
              </Col>
              <Col md={2}>
                <img src={Twitter} alt="twitter" /><br/>
                Twitter
              </Col>
              <Col md={2}>
                <img src={Youtube} alt="youtube" /><br/>
                Youtube
              </Col>
              <Col md={2}>
                <img src={Instagram} alt="instagram" /><br/>
                Instagram
              </Col>
              <Col md={2}>
                <img src={Facebook} alt="facebook" /><br/>
                Facebook
              </Col>
              <Col md={2}>
                <img src={Facebook} alt="facebook" /><br/>
                Facebook
              </Col>
            </Row>
          </Grid>
        </Row>
      )
    }
}
export default SocialMedaibar;