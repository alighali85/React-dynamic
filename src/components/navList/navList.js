import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import './nav-list.scss'

class NavList extends Component {
  render () {
    const {listSource} = this.props
    return (<div>
      { listSource.map((item, i) =>
        <ListGroup className='footer-nav-list text-center' key={i}>
          <ListGroupItem>{item.item1}</ListGroupItem>
          <ListGroupItem>{item.item2}</ListGroupItem>
          <ListGroupItem>{item.item3}</ListGroupItem>
        </ListGroup>
      )}
    </div>

    )
  }
}

export default NavList
