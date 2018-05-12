import React, { Component } from 'react'
import './side-menu.scss'

class SideMenu extends Component {
  constructor (props, ...rest) {
    super(props, ...rest)
    this.state = {}
  }

  render () {
    return (
      <div class='admin-side-menu' >
      Admin
      </div>
    )
  }
}

export default SideMenu
