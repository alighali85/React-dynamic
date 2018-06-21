import React, { Component } from 'react'
import { Row, Col, Grid } from 'react-bootstrap'
import './app-footer.scss'
import SocialMedaibarSmall from '../socialMediaBar/SocialMediaBarSmall'
import CopyRight from '../copyRight/CopyRight.js'
import { Link } from 'react-router-dom'

class AppFooter extends Component {
  componentDidMount () {
  }

  render () {
    const { source } = this.props
    return (
      <Row className='app-footer'>
        <Grid>
          <Row className='app-footer__row'>
            {source.map(item => <Col md={4} sm={4} xs={12} className='app-footer__item'>
              <Link to={`/category/page/${item.pageId}`}>{item.name}</Link>
            </Col>
            )}
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
