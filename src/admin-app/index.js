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
        <h2>admin app</h2>
        { this.state.isLoggedIn ? <Home /> : <Login /> }
      </div>
    )
  }
}

export default AdminApp
