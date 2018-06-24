import React, {Component} from 'react'
import { getDataFromDb } from './api/firebaseInstances'
import firebase from 'firebase'
import CategoryPage from './components/categoryPage/CategoryPage'
import PagesPage from './components/pagesPage/PagesPage'
import { withRouter } from 'react-router'
import './styles/category.scss'


export class Category extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pageId: null,
      catergories: [],
      matchedCategory: {},
      matchedPages: [],
      categoryKey: null,
      pages: [],
      location: this.props.match.url
    }
  }

  componentDidMount = () => {
    const {id} = this.props.match.params
    this.loadCategories(id)
  }
  
  componentWillReceiveProps = (nextProps) => {
    console.log('this . props match>  ' + this.props.match)
    const currentLocation = this.props.match.url
    const nextLocation = nextProps.match.url
    const { id } = nextProps.match.params

    if(currentLocation !== nextLocation) {
      this.loadCategories(id)  
    }
  }

   //get actegories
   loadCategories = (id) => {
    const categoriesList = getDataFromDb('Categories')
    let newSt = this.state
    newSt['pageId'] = id

    categoriesList.forEach(element => {
      if ( element.id ==id ) {
        newSt['categoryKey'] = element.key
        newSt['matchedCategory'] = element
      }
    })

    this.setState(newSt)
    this.loadPages(newSt['categoryKey'])
  }
  
  loadPages = (key) => {
    const adminAppdatabase = firebase.database()
    const pagesData = adminAppdatabase.ref().child('Pages')
    var pages = []
    let matchedPages = []
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
      if (page.category == (key) ) {
        matchedPages.push(page )
      }
    })
    //save data to state
    let newSt = this.state
    newSt['matchedPages'] = matchedPages
    this.setState(newSt)      
  })
  }

  render () {
    const { matchedCategory, matchedPages, location } = this.state
    const renderPages = (matchedPages) => matchedPages.map(page => (<h2>{page.pageName}here is the page</h2>) )
    return (
      <div className='category-container'>
        <CategoryPage 
        backgroundImage={matchedCategory.image}
        title={matchedCategory.name}
        />
        {renderPages}
        {matchedPages.map(page => <PagesPage 
          title={page.name} 
          link={`page/${page.pageId}`} 
          text={page.title} 
          image={page.image}
          parentId={matchedCategory.id}
          />)
        }
      </div>
    )
  }
}
export default withRouter(Category)
