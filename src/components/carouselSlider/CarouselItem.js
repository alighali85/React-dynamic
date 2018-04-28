import React from 'react';
import { Carousel } from 'react-bootstrap';

const { Item } = Carousel;
class CarouselItem extends Item {
  constructor() {
    render() {
      return (
        <Item />
      )
    }
  }
}