import React, { Component } from 'react'
import { checkLocalToken } from './auth/auth.js'
import Home from './Home'
import Login from './login/Login'

export class AdminApp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  componentWillMount () {
    this.setState.authUser = checkLocalToken()
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
