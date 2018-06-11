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
  image: null,
  text: null,
  link: 'card default link'
}

export default class ItemCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { title, image, text, onClick } = this.props
    return (
      <div className='item-card'>
        <Panel
          className='item-card__panel'
          style={{backgroundImage: `url(${image})`}}
          onClick={onClick}
        >
          <Panel.Heading className='item-card__header'>
            <h3 className='item-card__title'>{title}</h3>
          </Panel.Heading>
          <Panel.Body className='item-card__text'>{text}{this.props.children}</Panel.Body>
        </Panel>
      </div>
    )
  }
}

ItemCard.propTypes = propTypes
ItemCard.defaultProps = defaultProps
