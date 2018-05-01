import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import './nav-list.scss'

class NavList extends Component {
  render () {
    return (
      <ListGroup className='footer-nav-list text-center'>
        <ListGroupItem>القسم </ListGroupItem>
        <ListGroupItem>موضوع ١ </ListGroupItem>
        <ListGroupItem>موضوع ٢ </ListGroupItem>
      </ListGroup>
    )
  }
}

export default NavList
