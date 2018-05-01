import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'
import SlideImageOne from '../../assest/img/slider-1.jpg'
import './carousel.scss'

class CarouselSlider extends Component {
  render () {
    return (
      <Carousel>
        <Carousel.Item height={500} style={{backgroundImage: SlideImageOne, height: 500}}>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item height={500} style={{backgroundImage: SlideImageOne, height: 500}} >
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item height={500} style={{backgroundImage: SlideImageOne, height: 500}}>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
  }
}

export default CarouselSlider
