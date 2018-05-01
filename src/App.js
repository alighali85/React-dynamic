import React, { Component } from 'react'
import AppNavBar from './components/appNavBar/AppNavBar.js'
import CarouselSlider from './components/carouselSlider/CarouselSlider.js'
import SocialMediaBar from './components/socialMediaBar/SocialMediaBar.js'
import CallToActionBar from './components/callToActionBar/CallToActionBar.js'
import NavTabs from './components/navTabs/NavTabs'
import AppFooter from './components/appFooter/AppFooter'
import AppJumbtron from './components/appJumbotron/AppJumbotron.js'
import CardImage from './assest/img/card-header-1.jpg'

const Youtube = () => (
  <iframe width='100%' height='315' src='https://www.youtube.com/embed/tgbNymZ7vqY' />
)

const Articles = () => (
  <div>
    <div className='card col-md-3'>
      <img className='card-img-top' src={CardImage} alt='Card cap' />
      <div className='card-body'>
        <p className='card-text'>يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء </p>
      </div>
    </div>
    <div className='card col-md-3'>
      <img className='card-img-top' src={CardImage} alt='Card cap' />
      <div className='card-body'>
        <p className='card-text'>يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء </p>
      </div>
    </div>
    <div className='card col-md-3'>
      <img className='card-img-top' src={CardImage} alt='Card cap' />
      <div className='card-body'>
        <p className='card-text'>يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء </p>
      </div>
    </div>
    <div className='card col-md-3'>
      <img className='card-img-top' src={CardImage} alt='Card cap' />
      <div className='card-body'>
        <p className='card-text'>يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء </p>
      </div>
      <br />
      <hr />
    </div>
  </div>
)

class App extends Component {
  render () {
    return (
      <div className='App'>
        <AppNavBar children={<NavTabs />} />
        <CarouselSlider />
        <CallToActionBar />
        <SocialMediaBar />
        <AppJumbtron children={<Articles />} />
        <AppJumbtron children={<Youtube />} />
        <AppJumbtron />
        <AppFooter />
      </div>
    )
  }
}

export default App
