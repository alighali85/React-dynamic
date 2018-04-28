import  React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './cta-bar.scss';

class CallToActionBar extends Component {
    render() {
      return (
        <Row className="cta-bar"> 
          <Grid>
            <Row>
              <Col md={2}> Social icon </Col>
              <Col md={2}> Social icon </Col>
              <Col md={2}> Social icon </Col>
              <Col md={2}> Social icon </Col>
              <Col md={2}> Social icon </Col>
              <Col md={2}> Social icon </Col>
            </Row>
          </Grid>
        </Row>
      )
    }
}
export default CallToActionBar;