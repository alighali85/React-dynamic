import  React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class SocialMedaibar extends Component {
    render() {
      return (
        <Row> 
          <Grid>
            <Row>
              <Col md={2}> Social icon </Col>
            </Row>
          </Grid>
        </Row>
      )
    }
}
export default SocialMedaibar;