import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import './loader.scss'

class Loader extends Component {
  constructor (props, ...rest) {
    super(props, ...rest)
    this.state = {}
  }

  render () {
    const { iconSource, iconSize, spin } = this.props
    return (
      <div className='loader-wrapper'>
        <FontAwesome name={iconSource} size={iconSize} spin={spin} />
        <br />
        <h4>يتم التحميل</h4>
      </div>
    )
  }
}

Loader.PropTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
  spin: PropTypes.bool
}

Loader.defaultProps = {
  iconSource: 'spinner',
  iconSize: '2x',
  spin: true
}

export default Loader
