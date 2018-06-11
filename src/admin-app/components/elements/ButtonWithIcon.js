import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import './button-with-icon.scss'

const propTypes = {
  ButtonStyle: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.fun,
  iconName: PropTypes.string,
  iconSize: PropTypes.string,
  iconStyle: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  float: PropTypes.string,
  type: PropTypes.string
}

const defaultProps = {
  ButtonStyle: 'primary',
  name: 'button',
  onClick: () => {},
  iconName: 'adjust',
  iconSize: '1',
  iconStyle: '',
  text: 'click',
  disabled: false,
  float: '',
  type: ''
}

class ButtonWithIcon extends Component {
  constructor (props, ...rest) {
    super(props, ...rest)
    this.state = {}
  }

iconStyle = {
    top: 3+ 'px',
    marginLeft: 7+ 'px',
    marginRight: -14+'px'
}
  render () {
    const { ButtonStyle, name, onClick, iconName, iconSize, iconStyle, text, disabled, float, type, className } = this.props
    return (
      <div className={`button-with-icon ${className}`}>
        <Button
          bsStyle={ButtonStyle}
          name={name}
          onClick={onClick}
          disabled={disabled}
          style={{float: float}}
          type={type}
        >
          <FontAwesome
            name={iconName}
            size={iconSize}
            className={iconStyle}
            style={this.iconStyle}
          />
          {text}
          {this.props.children}
        </Button>
      </div>
    )
  }
}

ButtonWithIcon.propTYpes= propTypes
ButtonWithIcon.defaultProps = defaultProps

export default ButtonWithIcon
