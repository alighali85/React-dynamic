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
import CallToActionBar from './components/callToActionBar/CallToActionBar.js'
import ScrollToTop from 'react-scroll-up'
import './styles/app.scss'
import AdminApp from './admin-app/index.js'
import AppJumbtron from './components/appJumbotron/AppJumbotron.js'
import { getDataFromDb } from './api/firebaseInstances'
// import Categories from './admin-app/components/categories/Categories'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentId: 0,
      pages: [],
      frontpagePages: [],
      sliderPages: [],
      footerPages: [],
      loading: false,
      frontpageCategories: [],
      categories: [],
      newpages: []
    }
  }

  componentDidMount() {
    this.loadPages()
    this.loadCategories()
    window.scrollTo(0, 0);
  }

  loadPages = (key) => {
    const adminAppdatabase = firebase.database()
    const pagesData = adminAppdatabase.ref().child('Pages')
    let newSt = this.state
    var pages = []
    let matchedPages = []
    let footerPages = []
    let sliderPages = []
    let frontpagePages = []
    //get all pages 
    pagesData.on('value', (snap) => {
      snap.forEach((cat) => {
        pages.push({ key: cat.key, ...cat.val() })
      })
    //filter pages and return category pages and footer
    pages.forEach(page => {
      if (page.category === (key) ) {
        matchedPages.push(page )
      } 
      if (page.showOnfooter === '1') {
        footerPages.push(page)
      }
      if (page.pageInSlide === '1') {
        sliderPages.push(page)
      }
      if (page.showInFrontPage === '1') {
        frontpagePages.push(page)
      }
    })
    //save data to state
    newSt['pages'] = pages
    newSt['sliderPages'] = sliderPages
    newSt['footerPages'] = footerPages
    newSt['frontpagePages'] = frontpagePages
    this.setState(newSt)      
    })
  }

  loadCategories = (key) => {
    const adminDB = firebase.database()
    const categoriesDB = adminDB.ref().child('Categories')
    let newState = this.state
    let cats = []
    let fpCats = [] 
    categoriesDB.on('value', snap => {
      snap.forEach( cat => {
        const { showOnFrontpage } = cat.val()
        if ( showOnFrontpage === '1') {
          fpCats.push({key: cat.key, ...cat.val()})
        }
        cats.push({key: cat.key, ...cat.val()})
      })
      newState['categories'] = cats
      newState['frontpageCategories'] = fpCats
      this.setState(newState)
    })
    this.setupFrontpage(fpCats)
}

setupFrontpage = (cats) => { 
  let newState = this.state
  let fpCategoires = cats
  let pages = []
  let frontpagePages =[]

  const adminAppdatabase = firebase.database()
  const pagesData = adminAppdatabase.ref().child('Pages')
  
  pagesData.on('value', (snap) => {
    snap.forEach((cat) => {
      pages.push({ key: cat.key, ...cat.val() })
    })
  //filter pages and return category pages and footer
    pages.forEach(page => { 
      if (page.showInFrontPage === '1') {
        frontpagePages.push(page)
      }
    })
    const catWithPages = fpCategoires.map( cat => {
      let catKey = cat.key 
      let pages = []
      frontpagePages.forEach(page => {
        if (page.category == catKey) {
          pages.push(page)
        }
      })
      cat = Object.assign({pages: pages}, cat)
      return cat
    })
      newState['frontpageCategories'] = catWithPages
      console.log(newState)
      this.setState(newState)
  })
}


  componentWillReceiveProps (nextProps) {
    window.scrollTo(0, 0);
    if (this.props.match.url !== nextProps.match.url) {
      this.loadPages()
      this.setState({
        currentId: nextProps.match.url
      })
    }
  }

  render () {
    const { pages, sliderPages, footerPages, frontpageCategories, newpages } = this.state
    console.log(this.state)
    const { pathname } = this.props.location
    const recentPages = pages.slice((pages.length) - 3)

    if ( pathname.indexOf('admin-app') > -1 ) {
      return <AdminApp/>
    } 
    else {
      return (
      <div className='app-block'>
        <AppNavBar children={<NavTabs />} />
        <CallToActionBar />
        {pathname === '/' && <CarouselSlider source={sliderPages}/>}
        <Grid className='app-block__container' fluid>
          <Col md={8} lg={8} className='app-block__container-main'>
            {pathname === '/' &&
              frontpageCategories.map(cat => <AppJumbtron title={cat.name} content={cat.pages}/>)
            }
            <Switch>
              <Route path='/category/:id' component={Category} exact />
              <Route path='/category/page/:id' component={Page} exact />
            </Switch>
          </Col>
          <Col md={4} lg={4}>
            <div>
              <br /><br />
              <SideSlider interval={10000} indicators={false} />
              <ListBlock source={recentPages} title='المضافة حديثا '/>
              <TwitterTimeline />
              <SideSlider controls={false} interval={5000}/>
            </div>
          </Col>
        </Grid>
        <AppFooter source={footerPages}/>
        <ScrollToTop showUnder={160} style={{left: '30px'}}>
          <div style={{fontSize: '3em', color: '#9A12B3'}}>
            <i class="fas fa-chevron-circle-up"></i>
          </div>
        </ScrollToTop>
      </div>
      )
    }
  }
}

export default withRouter(App)
