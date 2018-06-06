import React from 'react'
import PropTypes from 'prop-types'
import './category-page.scss'

const propTypes = {
  title: PropTypes.string,
  backgroundImage: PropTypes.string
}

const defaultProps = {
  title: 'default title',
  backgroundImage: ''
}

export default class CategoryPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { backgroundImage, title } = this.props
    return (
      <div className='category-page'>
        <div className='category-page__header' style={{backgroundImage: `url(${backgroundImage})`}}>
          <h2 className='category-page__title'>{title}</h2>
        </div>
      </div>
    )
  }
}

CategoryPage.propTypes = propTypes
CategoryPage.defaultProps = defaultProps
