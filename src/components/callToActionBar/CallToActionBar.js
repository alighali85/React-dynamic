import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import './cta-bar.scss'
import { APP_CTA_CALL_US, APP_CONTACT_PHONE } from '../../assest/constants/AppMainContent.js'

class CallToActionBar extends Component {
  render () {
    return (
      <Row className='cta-bar'>
        <Grid className='cta-bar-inner-container'>
          <Row className='text-xs-center'>
            <Col md={8} sm={6} className='text-right'>
              <div className='app-cta-phone-number'>{APP_CONTACT_PHONE}</div>
            </Col>
            <Col md={4} sm={6}>
              <span className='glyphicon glyphicon-earphone' />
              <span className='ap-cta-call-us'>{APP_CTA_CALL_US} :</span>
            </Col>
          </Row>
        </Grid>
      </Row>
    )
  }
}
export default CallToActionBar
