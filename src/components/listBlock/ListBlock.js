import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap'
import './list-block.scss'
import { Link } from 'react-router-dom'

const propTypes = {
  source: PropTypes.array
}

const defaultProps = {
  source: [
    {
      title: '',
      text: '',
      image: null
    },
    {
      title: '',
      text: '',
      image: null
    },
    {
      title: '',
      text: '',
      image: null
    }
  ]
}

export default class ListBlock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      source: this.props.source,
    }
  }

  render () {
    const { title,source } = this.props
    const renderList = source.map(item => <Link to={`/category/page/${item.pageId}`}> <ListGroupItem
      className='list-block__list-item'
      style={{backgroundImage: `url(${item.image})`}}
    >
      <div className='list-block__list-item__headline'>{item.name}</div>
    </ListGroupItem>
    </Link>
    )
    return (
      <div className='list-block'>
        <Panel className='list-block__panel'>
          <Panel.Heading className='list-block__headline'>{title}</Panel.Heading>
          <ListGroup className='list-block__list'>
            {renderList}
          </ListGroup>
        </Panel>
      </div>
    )
  }
}

ListBlock.propTypes = propTypes
ListBlock.defaultProps = defaultProps
