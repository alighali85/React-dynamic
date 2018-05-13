import React, { Component } from 'react'
import './side-menu.scss'

class SideMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chile: ''
    }
  }

  render () {
    return (
      <div class='admin-side-menu' >
        {this.props.children}
      </div>
    )
  }
}

export default SideMenu
