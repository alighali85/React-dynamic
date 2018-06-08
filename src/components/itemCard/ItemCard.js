import React from 'react'
import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap'
import './item-card.scss'

const propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string
}

const defaultProps = {
  title: 'title',
  image: 'image link',
  text: 'card text',
  link: 'card default link'
}

export default class ItemCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { title, image, link, text } = this.props
    return (
      <div className='item-card'>
        <Panel className='item-card__panel' style={{backgroundImage: `url(${image})`}}>
          <Panel.Heading className='item-card__header'>
            <h3 className='item-card__title'>{title}</h3>
          </Panel.Heading>
          <Panel.Body
            onClick={() => { this.props.history.push(link) }}
            className='item-card__text'>{text}</Panel.Body>
        </Panel>
      </div>
    )
  }
}

ItemCard.propTypes = propTypes
ItemCard.defaultProps = defaultProps
