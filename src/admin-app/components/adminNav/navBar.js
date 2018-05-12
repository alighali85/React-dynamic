import React from 'react'
import './navBar.scss'
import { Button, Grid, Col, Image } from 'react-bootstrap'
import { signUserOut } from '../../auth/auth'
import FontAwesome from 'react-fontawesome'
import userIcon from '../../assets/images/user-icon.svg'

const  userInfos = {
  name: "مدير الموقع",
  lastVisit: "11/05/2018"
 }
export default class NavBar extends React.Component {
  constructor(props) { 
    super(props)
    this.state = {
      isSignedIn: true
    }
  }
  
  logout = () => {
    signUserOut();
    this.setState({
      isSignedIn: false
    })
  }

  render () {
    const {isSignedIn} = this.state
    if (!isSignedIn) {
      window.location.href = '/admin-app' 
    } else {
      return (
        <div className='admin-nab-bar'>
          <Grid>

            <Col xs={4} md={6} className='right-menu'>
            <Button
              className='logout-button'
              bsStyle="success"
              onClick={this.logout} >
              Logout
              <FontAwesome name='user' size='1x' className='user-button-icon' />
            </Button>

            </Col>
            <Col xs={8} md={6} className='left-menu'>
              <Image src={userIcon} circle className='user-icon'/>
              <h4 className='inline-info'> أهلا يا {userInfos.name}</h4>
              <h4 className='inline-info'> أخر زيارة لك في {userInfos.lastVisit} </h4>

            </Col>

          </Grid>
        </div>
      )
    }
  }
}
