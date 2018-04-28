import React, { Component } from 'react';
import AppNavBar from './components/appNavBar/AppNavBar.js';
import CarouselSlider from './components/carouselSlider/CarouselSlider.js';
import SocialMediaBar from './components/socialMediaBar/SocialMediaBar.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavBar />
        <CarouselSlider />
        <SocialMediaBar />
      </div>
    );
  }
}

export default App;
