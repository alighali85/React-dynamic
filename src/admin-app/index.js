import React, { Component } from 'react'
import { checkLocalToken } from './auth/auth.js'
import Home from './Home'
import Login from './login/Login'

export class AdminApp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: true
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
  componentDidMount () {
    this.setState({
      isLoggedIn: checkLocalToken()
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      isLoggedIn: checkLocalToken()
    })
  }

  render () {
    return (
      <div>
        { this.state.isLoggedIn ? <Home /> : <Login /> }
      </div>
    )
  }
}

export default AdminApp
