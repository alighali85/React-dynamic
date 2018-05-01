import React, { Component } from 'react'
import AppNavBar from './components/appNavBar/AppNavBar.js'
import CarouselSlider from './components/carouselSlider/CarouselSlider.js'
import SocialMediaBar from './components/socialMediaBar/SocialMediaBar.js'
import CallToActionBar from './components/callToActionBar/CallToActionBar.js'
import NavTabs from './components/navTabs/NavTabs'
import AppFooter from './components/appFooter/AppFooter'
import AppJumbtron from './components/appJumbotron/AppJumbotron.js'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <AppNavBar children={<NavTabs />} />
        <CarouselSlider />
        <CallToActionBar />
        <SocialMediaBar />
        <AppJumbtron />
        <AppJumbtron />
        <AppJumbtron />
        <AppFooter />
      </div>
    )
  }
}

export default App
