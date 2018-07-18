import React from 'react'
import ItemCard from './components/itemCard/ItemCard'
import './styles/page.scss'
import firebase from 'firebase'

import { withRouter} from 'react-router'
import {  Link } from 'react-router-dom'

class Page extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      page: null,
      pageId: null,
      pageKey: null,
      pageContent: null,
      relatedPages: []
    }
  }

  componentDidMount () {
    window.scrollTo(0, 0);
    const { id } = this.props.match.params
    this.getPageDetails(id)
  }
  
  componentWillReceiveProps(nextProps) {
    const { id } = nextProps.match.params
    this.getPageDetails(id)
    window.scrollTo(0, 0);
  }

  getPageDetails = (id) => {
    const adminAppdatabase = firebase.database()
    const pagesData = adminAppdatabase.ref().child('Pages')
    let pages = []
    let page = {}
    //get all pages 
    pagesData.once('value', (snap) => {
      snap.forEach((cat) => {
        pages.push({
          key: cat.key,
          ...cat.val()
        })
      })
      //filter pages and return category pages
    pages.forEach(page => {
      if (page.pageId == (id) ) {
        page = {
          page: page.name,
          pageId: id,
          pageKey: page.key,
          pageContent: page.content,
          categoryKey : page.category
        }
        page['relatedPages'] = this.getRelatedpages(page.categoryKey, pages, id)
        this.setState(page)
      }
    })
  })

  }
  

  getRelatedpages = (category, pages, id) => {
    pages = pages.filter(page => {
      return (page.category === category && page.pageId !== id )
    })
    let randomIndex = []
    for(let i = 0 ; i < pages.length; i++) {
      const num = Math.floor(Math.random() * Math.floor(i));
      if (randomIndex.indexOf(num) <= -1) {
        randomIndex.push(num)
      }
    }
    let relatedPages = []
    randomIndex.forEach(i => {
      relatedPages.push(pages[i])
    })
   return relatedPages
  }

  goToPage = (link) => {
    this.props.history.push(`/category/page/${link}`)
    this.setState({
      pageId:link
    })
  }

  render () {
    const { page, pageContent, relatedPages } = this.state
    const categoryId = (this.props.location.state ? this.props.location.state.categoryId : 1 )
    return (
      <div className='page-details'>
        <h2 className='page-details__title'>{page}</h2><br />
        <div id='pageContent' dangerouslySetInnerHTML={{ __html: pageContent }} />
        <br />
        <br />
        <div className='related-pages'>
        <h2 className='related-pages__headline'>مواضيع متعلقة</h2>
        {relatedPages.map(page => <Link 
          to={{
            pathname: `/category/page/${page.pageId}`,
            state: {
              categoryId: categoryId
            }
          }}>
          <ItemCard 
          title={page.name}
          onClick={() => this.goToPage(page.pageId)}
          image={page.image}
          />
        </Link>)}
        </div>
      </div>
    )
  }
}

export default withRouter(Page)
