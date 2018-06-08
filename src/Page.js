import React from 'react'
import { getDataFromDb } from './admin-app/api/firebaseInstances'
import ItemCard from './components/itemCard/ItemCard'
import './styles/page.scss'

export default class Page extends React.Component {
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
    const { id } = this.props.match.params
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

    console.log('all the pages'+ pages)
    const allPagesNotLastOne = pages.filter((page,i)=> page.pageId !== pages.length)
    console.log("last pages " + allPagesNotLastOne )
    allPagesNotLastOne.forEach(page => {
      console.log(page.name)
    })
    this.setState({
      relatedPages: allPagesNotLastOne
    })
  }

  render () {
    const { page, pageContent,relatedPages } = this.state
    return (
      <div>
        <h2>{page}</h2><br />
        <div id='pageContent2' dangerouslySetInnerHTML={{ __html: pageContent }} />
        <br />
        <br />
        <div className='related-pages'>
        {relatedPages.map(page => <ItemCard 
          title={page.title}
          link={'link here'}
          image={page.image}
          />)}
        </div>
      </div>
    )
  }
}
