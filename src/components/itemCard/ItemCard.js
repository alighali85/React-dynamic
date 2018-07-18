import React from 'react'
import PropTypes from 'prop-types'
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
    const { title, onClick } = this.props
    return (
      <div className='item-card'>
        <div
          className='item-card__item'
          onClick={onClick}
        >
          <h3 className='item-card__title'>{title}</h3>
        </div>
      </div>
    )
  }
}

ItemCard.propTypes = propTypes
ItemCard.defaultProps = defaultProps
