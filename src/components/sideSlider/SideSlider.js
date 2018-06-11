import React from 'react'
import PropTypes from 'prop-types'
import { Panel, Carousel } from 'react-bootstrap'
import './side-slider.scss'

const propTypes = {
  source: PropTypes.array,
  headline: PropTypes.string,
  interval: PropTypes.number,
  controls: PropTypes.bool
}

const defaultProps = {
  controls: true,
  interval: 500,
  headline: 'اتصل بنا عبر',
  source: [
    {
      title: '',
      text: '',
      image: null
    },
    {
      title: '',
      text: '',
      image: null
    },
    {
      title: '',
      text: '',
      image: null
    }
  ]
}

export default class SideSlider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { source, interval, controls } = this.props
    return (
      <div className='side-slider'>
        <Panel>
          <Carousel interval={interval} controls={controls}>
            { source.map((item, i) => <Carousel.Item>
              <img width={900} height={500} alt='900x500' src={item.image} />
              <Carousel.Caption>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
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
