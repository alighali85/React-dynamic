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
import { getDataFromDb } from './api/firebaseInstances'
import ScrollToTop from 'react-scroll-up'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentId: 0,
      pages: [],
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
    newSt['pages'] = pages
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
    console.log(this.state)
    const { pages } = this.state
    return (
      <div className='App block'>
        <AppNavBar children={<NavTabs />} />
        <Grid>
          <Col md={8} lg={8}>
            <Switch>
              <Route path='/category/:id' component={Category} exact />
              <Route path='/category/page/:id' component={Page} exact />
            </Switch>
          </Col>
          <Col md={4} lg={4}>
            <div>
              <br /><br />
              <ListBlock source={pages} title='أحدث الصفحات'/>
              <TwitterTimeline />
              <SideSlider controls={false} interval='10000' />
              <SideSlider controls={false} interval='5000' />
              <SideSlider controls interval='20000' />
              <SideSlider controls={false} interval='7500' />
              <SideSlider controls={false} interval='10000' />
            </div>
          </Col>
        </Grid>
        <AppFooter />
        <ScrollToTop showUnder={160} style={{left: '30px'}}>
            <div style={{fontSize: '3em', color: '#800285', opacity: .8 }}>
            <i class="fas fa-chevron-circle-up"></i>
            </div>
        </ScrollToTop>
      </div>
    )
  }
}

export default withRouter(App)
