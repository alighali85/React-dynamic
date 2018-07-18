import React from 'react'
import PropTypes from 'prop-types'
import { Panel, Carousel } from 'react-bootstrap'
import './side-slider.scss'
import FontAwesome from 'react-fontawesome'
import { CONTACT_SLIDE } from '../../assest/constants/AppMainContent'

const propTypes = {
  source: PropTypes.array,
  headline: PropTypes.string,
  interval: PropTypes.number,
  controls: PropTypes.bool
}

const defaultProps = CONTACT_SLIDE

export default class SideSlider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  goToLink = (link) => {
    window.location.href = link
  }

  render () {
    const { source, interval, controls, indicators } = this.props
    return (
      <div className='side-slider'>
        <Panel>
          <Carousel indicators={indicators} interval={interval} controls={controls}>
            { source.map((item, i) => <Carousel.Item key={i}>
              <br />
              <Carousel.Caption onClick={() => this.goToLink(item.link)}>
                <h3 className='side-slider__title'>{item.title}</h3>
                <i className={`fab ${item.icon} fa-4x`} />
                <br />
                <h4 className='side-slider__text'>{item.text}</h4>
              </Carousel.Caption>
            </Carousel.Item>)
            }
          </Carousel>
        </Panel>
      </div>
    )
  }
}

SideSlider.propTypes = propTypes
SideSlider.defaultProps = defaultProps
