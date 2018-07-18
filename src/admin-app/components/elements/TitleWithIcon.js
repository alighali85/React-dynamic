import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import './title-with-icon.scss'

class TitleWithIcon extends Component {
  render () {
    const { icon, iconClassName, iconSize, title, subTitle } = this.props
    return (
      <div>
        <h2 className='title-with-icon__title'>
          <FontAwesome
            className={iconClassName}
            name={icon}
            size={iconSize}
          />
          {' ' + title + ' '}
        </h2>
        {subTitle && <h5>{subTitle}</h5>}
      </div>
    )
  }
}

export default TitleWithIcon
