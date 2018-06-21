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


const JumbtronContent4 = [
  {
    title: 'المزيد في الروحانيات',
    content: 'ولكنها مجهولة لعدم عقلية الحيوان ولا يشترط الإنسان أن يكون متابعا نوعا معينا من العبادة أو يسلك سلوك غير مشروع فكل هذه الأساليب تنمى الروحانية حسب ما يسلك الإنسان . أن يكون عابدا فاتكون روحانيته شفافة وطاهرة أو يكون غير ذلك في سلوكه وقد ذكرنا أن الإنسان بطبيعته روحاني ولكن شخص تظهر علية هذه الروحانية وشخص لا تظهر عليه و من الممكن إن ينمى أي شخص روحانيته بتدريبات معينة وإذا تقرب الإنسان إلى العبادة فسوف تعلق روحانيته بروحانية الملائكة كما ذكرنا في أول الأمر أما إذا بعد عن ذلك فسوف يسير معه الشيطان ويشعره بأنه هو الذي يمن عليه بكل هذا العلم ويوجهه إلى الخير حتى يصدقه وبعد ذلك يوجهه إلى الشرور والمعاصي حتى يكفر ولا يستطيع الإنسان آن يرجع عما هو فيه لأنه يشبع رغبته بكل شئ موجود حوله *',
    button: 'المزيد',
    image: ''
  }
]

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentId: 0,
      pages: [],
      sliderPages: [],
      footerPages: [],
      loading: false
    }
  }

  componentDidMount() {
    this.loadPages()
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
    //get all pages 
    pagesData.on('value', (snap) => {
      snap.forEach((cat) => {
        pages.push({ key: cat.key, ...cat.val() })
      })
    //filter pages and return category pages and footer
    pages.forEach(page => {
      if (page.category == (key) ) {
        matchedPages.push(page )
      } 
      if (page.showOnfooter === '1') {
        footerPages.push(page)
      }
      if (page.pageInSlide === '1') {
        sliderPages.push(page)
      }
    })
    //save data to state
    newSt['pages'] = pages
    newSt['sliderPages'] = sliderPages
    newSt['footerPages'] = footerPages
    console.log(footerPages)
    console.log('footer Pages')
    this.setState(newSt)      
    })
  }

  loadCategories = (key) => {
    const adminAppdatabase = firebase.database()
    const categoriesData = adminAppdatabase.ref().child('Categories')
    let newSt = this.state
    var categories = []
    let frontPageCategories = []
    //get all pages 
    categoriesData.on('value', (snap) => {
      snap.forEach((cat) => {
        categories.push({ key: cat.key, ...cat.val() })
      })
    //filter pages and return category pages and footer
    categories.forEach(categorie => {
      // if (categorie.show == (key) ) {
      //   matchedPages.push(page )
      // } 
      // if (page.showOnfooter === '1') {
      //   footerPages.push(page)
      // }
      // if (page.pageInSlide === '1') {
      //   sliderPages.push(page)
      // }
    })
    //save data to state
    newSt['categories'] = categories
    console.log('frontpage Categories')
    this.setState(newSt)      
    })
  }

  componentWillUpdate (nextProps, nextState) {
  }

  componentDidUpdate (prevProps, prevState) {
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

  renderCategory = () => {
    console.log('here is the render categories function')
  }

  render () {
    const { pages, sliderPages, footerPages } = this.state
    const { pathname } = this.props.location
    const recentPages = pages.slice((pages.length) - 3)


    if ( pathname.indexOf('admin-app') > -1 ) {
      return <AdminApp/>
    } else {

    return (
      <div className='app-block'>
        <AppNavBar children={<NavTabs />} />
        <CallToActionBar />
        {pathname === '/' && <CarouselSlider source={sliderPages}/>}
        <Grid className='app-block__container'>
          <Col md={8} lg={8}>
            {pathname === '/' && <AppJumbtron source={JumbtronContent4} />}
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
