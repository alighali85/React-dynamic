import React, { Component } from 'react'
import { checkLocalToken } from './auth/auth.js'
import Home from './Home'
import Login from './login/Login'
import { BrowserRouter } from 'react-router-dom'

export class AdminApp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }
  /**
 * Admin App Components:
 * 1- navigation bar:
 *    1- user name
 *    2- user photo
 *    3-time
 *    4- signout Button
 *    5-last logged in time
 *
 *
 */
  componentWillMount () {
    this.setState({
      isLoggedIn: checkLocalToken()
    })
    console.log('state loggin state' + this.state.isLoggedIn)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      isLoggedIn: checkLocalToken()
    })
  }

  render () {
    return (
      <div>
        <h2>admin app</h2>
        { this.state.isLoggedIn ? <Home /> : <Login /> }
      </div>
    )
  }
}

export default AdminApp
