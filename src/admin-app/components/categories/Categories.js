import React, { Component } from 'react'
import './categories.scss'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

class Categories extends Component {
  render () {
    return (
      <div className='admin-categories'>
        Admin Categories page
        <CategoriesList />
      </div>
    )
  }
}

const CategoriesList = () => <ListGroup>
  <ListGroupItem header='Heading 1'>Some body text</ListGroupItem>
  <ListGroupItem header='Heading 2' href='#'>
  Linked item
  </ListGroupItem>
  <ListGroupItem header='Heading 3' bsStyle='danger'>
  Danger styling
  </ListGroupItem>
</ListGroup>

export default Categories
