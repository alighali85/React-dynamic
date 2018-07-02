import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './carousel.scss'
import { Link } from 'react-router-dom'

const propTypes = {
  source: PropTypes.array
}

const defaultProps = {
  source: [
    {
      title: 'واتس أب',
      text: '0966379892',
      icon: 'whatsapp'
    },
    {
      title: 'الموبايل',
      text: '0966379892',
      icon: 'mobile'
    },
    {
      title: 'فيس بوك',
      text: '/albasserah',
      icon: 'apple'
    }
  ]
}

class CarouselSlider extends Component {
  render () {
    const { source } = this.props
    return (<div className='carousel-slider'>
      <Carousel>
        {
          source.map(item => <Carousel.Item height={500} style={{backgroundImage: `url(${item.image})`, height: 500}}>
            <Carousel.Caption>
              <Link to={`/category/page/${item.pageId}`}>
                <h2>{item.name}</h2><br />
                <h4>{item.title}</h4>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
          )}
      </Carousel>
    </div>
    )
  }
}

CarouselSlider.propTypes = propTypes
CarouselSlider.defaultProps = defaultProps

export default CarouselSlider
