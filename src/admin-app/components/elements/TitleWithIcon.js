import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

class TitleWithIcon extends Component {
  render () {
    const { icon, iconClassName, iconSize, title, subTitle } = this.props
    return (
      <div>
        <h2>
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
