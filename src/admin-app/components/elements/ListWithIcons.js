import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import './list-with-icons.scss'

export default class ListWithIcons extends Component {
  render () {
    const { listSource } = this.props
    return (
      <ul className='list-with-icons'>
        {listSource.map((item, i) => <li key={item.key} className='list-with-icons--item'>
          <Link to={item.link} >
            <FontAwesome name={item.iconSource} size='2x' />
            <h4 style={{display: 'inline', marginRight: '14px'}}>{item.name}</h4>
          </Link>
        </li>
        )}
      </ul>
    )
  }
}
