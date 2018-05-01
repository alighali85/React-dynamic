import React, { Component } from 'react'
import { Grid, Row } from 'react-bootstrap'
import './app-footer.scss'

class AppFooter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Row className="app-footer">
      <div class="container">
      app contaier 
      </div>
      </Row>
    )
  }
}
export default AppFooter;