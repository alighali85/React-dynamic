import React from 'react'
import PropTypes from 'prop-types'
import { Panel, Carousel } from 'react-bootstrap'
import './side-slider.scss'
import FontAwesome from 'react-fontawesome'

const propTypes = {
  source: PropTypes.array,
  headline: PropTypes.string,
  interval: PropTypes.number,
  controls: PropTypes.bool
}

const defaultProps = {
  controls: true,
  interval: '500',
  headline: 'اتصل بنا عبر',
  source: [
    {
      title: 'واتس أب',
      text: '0966379892',
      icon: 'whatsapp'
    },
    {
      title: 'الموبايل',
      text: '0966379892',
      icon: 'mobile-alt'
    },
    {
      title: 'فيس بوك',
      text: '/albasserah',
      icon: 'apple'
    }
  ]
}

export default class SideSlider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { source, interval, controls, indicators } = this.props
    return (
      <div className='side-slider'>
        <Panel>
          <Carousel indicators={indicators} interval={interval} controls={controls}>
            { source.map((item, i) => <Carousel.Item>
              <br />
              <Carousel.Caption>
                <h3>{item.title}</h3>
                <FontAwesome name={item.icon} size='4x' /><br />
                <h4>{item.text}</h4>
              </Carousel.Caption>
            </Carousel.Item>)}
          </Carousel>
        </Panel>
      </div>
    )
  }
}

SideSlider.propTypes = propTypes
SideSlider.defaultProps = defaultProps
