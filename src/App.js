import React, { Component } from 'react'
import AppNavBar from './components/appNavBar/AppNavBar.js'
import NavTabs from './components/navTabs/NavTabs'
import AppFooter from './components/appFooter/AppFooter'
import Category from './Category'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Grid, Col } from 'react-bootstrap'
import Page from './Page'
import SideSlider from './components/sideSlider/SideSlider'
import ListBlock from './components/listBlock/ListBlock'
import firebase from 'firebase'
import TwitterTimeline  from './components/twitterTimeline/TwitterTimeline'
import CarouselSlider from './components/carouselSlider/CarouselSlider.js'
import SocialMediaBar from './components/socialMediaBar/SocialMediaBar.js'
import CallToActionBar from './components/callToActionBar/CallToActionBar.js'
import ScrollToTop from 'react-scroll-up'
import './styles/app.scss'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentId: 0,
      pages: [],
      sliderPages: [],
      loading: false
    }
  }

  componentDidMount() {
    this.loadPages()
  }

  loadPages = (key) => {
    const adminAppdatabase = firebase.database()
    const pagesData = adminAppdatabase.ref().child('Pages')
    var pages = []
    let matchedPages = []
    //get all pages 
    pagesData.on('value', (snap) => {
      snap.forEach((cat) => {
        pages.push({ key: cat.key, ...cat.val() })
      })
    //filter pages and return category pages
    pages.forEach(page => {
      if (page.category == (key) ) {
        matchedPages.push(page )
      }
    })
    //save data to state
    let newSt = this.state
    const sliderPages = pages.filter(page => page.pageInSlide === '1')
    newSt['pages'] = pages
    newSt['sliderPages'] = sliderPages
    console.log(sliderPages)
    console.log('slider Pages')
    this.setState(newSt)      
    })
  }

  componentWillUpdate (nextProps, nextState) {
  }

  componentDidUpdate (prevProps, prevState) {
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.match.url !== nextProps.match.url) {
      this.loadPages()
      this.setState({
        currentId: nextProps.match.url
      })
    }
  }

  render () {
    const { pages, sliderPages } = this.state
    const recentPages = pages.slice((pages.length) - 3)
    console.log(sliderPages)
    console.log('slider  Pages')
    return (
      <div className='app-block'>
        <AppNavBar children={<NavTabs />} />
        <CarouselSlider source={sliderPages}/>
        <CallToActionBar />
        <Grid>
          <Col md={8} lg={8}>
            <Switch>
              <Route path='/category/:id' component={Category} exact />
              <Route path='/category/page/:id' component={Page} exact />
            </Switch>
            <SocialMediaBar />
          </Col>
          <Col md={4} lg={4}>
            <div>
              <br /><br />
              <SideSlider interval={10000} indicators={false} />
              <ListBlock source={recentPages} title='أحدث الصفحات'/>
              <TwitterTimeline />
              <SideSlider controls={false} interval={5000}/>
            </div>
          </Col>
        </Grid>
        <AppFooter />
        <ScrollToTop showUnder={160} style={{left: '30px'}}>
          <div style={{fontSize: '3em', color: '#9A12B3'}}>
            <i class="fas fa-chevron-circle-up"></i>
          </div>
        </ScrollToTop>
      </div>
    )
  }
}

export default withRouter(App)
