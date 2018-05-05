import React, { Component } from 'react'
import { Row, Col, Grid } from 'react-bootstrap'
import './app-footer.scss'
import SocialMedaibarSmall from '../socialMediaBar/SocialMediaBarSmall'
import CopyRight from '../copyRight/CopyRight.js'
import NavList from '../../components/navList/navList.js'

const list1 = [
  {
    item1: 'فك السحر',
    item2: 'خلطات الزوجية',
    item3: 'علاج الربط'
  }
]

const list2 = [
  {
    item1: 'علاج العقم عن طريق الأعشاب',
    item2: 'حجاب القبول',
    item3: 'خلطات الزوجية'
  }
]

const list3 = [
  {
    item1: 'خواتم سليمانية',
    item2: 'عرق السواحل',
    item3: 'بخور روحاني'
  }
]

class AppFooter extends Component {
  render () {
    return (
      <Row className='app-footer'>
        <Grid>
          <Row>
            <Col md={4} sm={4} xs={12}>
              <NavList listSource={list1} />
            </Col>
            <Col md={4} sm={4} xs={12}>
              <NavList listSource={list2} />
            </Col>
            <Col md={4} sm={4} xs={12}>
              <NavList listSource={list3} />
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
