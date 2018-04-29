import  React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './cta-bar.scss';
import { APP_CTA_CALL_US, APP_CONTACT_PHONE } from '../../assest/constants/AppMainContent.js'

class CallToActionBar extends Component {
    render() {
      return (
        <Row className="cta-bar"> 
          <Grid>
            <Row className="text-xs-center">
            <Col md={8}>{APP_CONTACT_PHONE}</Col>
            <Col md={3}>
              {APP_CTA_CALL_US}</Col>
            </Row>
          </Grid>
        </Row>
      )
    }
}
export default CallToActionBar;