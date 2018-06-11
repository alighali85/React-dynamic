import React from 'react'
import { getDataFromDb } from './admin-app/api/firebaseInstances'
import ItemCard from './components/itemCard/ItemCard'
import './styles/page.scss'
import { RELATED_PAGES_NUMBER } from './assest/constants/AppMainContent.js'
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
    console.groupCollapsed('component Did Mount')
    console.groupEnd()
    const { id } = this.props.match.params
    this.getPageDetails(id)
  }
  
  componentWillReceiveProps(nextProps) {
    const { id } = nextProps.match.params
    this.getPageDetails(id)
   console.groupCollapsed('component Will Receive Props')
   console.log(nextProps)
   console.log(this.props)
   console.groupEnd()
  }

  getPageDetails = (id) => {
    const pages = getDataFromDb('Pages')
    pages.forEach(item => {
      if (item.pageId == id) {
        this.setState({
          page: item.name,
          pageId: id,
          pageKey: item.key,
          pageContent: item.content
        })
      }
    })
    this.getRelatedpages(pages)
  }
  

  getRelatedpages = (pages) => {
    const allPagesNotLastOne = pages.filter((page,i) => {
      const allPagesCount = (pages.length) - RELATED_PAGES_NUMBER
      return (page.pageId < pages.length) && (page.pageId >= allPagesCount)
    })

    allPagesNotLastOne.forEach(page => {
    })
    this.setState({
      relatedPages: allPagesNotLastOne
    })
  }

  goToPage = (link) => {
    this.props.history.push(`/category/page/${link}`)
    console.log('pageId=  '+ link)
    this.setState({
      pageId:link
    })
  }

  render () {
    const { page, pageContent,relatedPages } = this.state
    const categoryId = (this.props.location.state ? this.props.location.state.categoryId : 1 )
    return (
      <div className='page-details'>
        <h2>{page}</h2><br />
        <div id='pageContent2' dangerouslySetInnerHTML={{ __html: pageContent }} />
        <br />
        <br />
        <div className='related-pages'>
        {relatedPages.map(page => <Link 
          to={{
            pathname: `/category/page/${page.pageId}`,
            state: {
              categoryId: categoryId
            }
          }}>
          <ItemCard 
          title={page.title}
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
