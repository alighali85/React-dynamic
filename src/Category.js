import React, {Component} from 'react'
import { getDataFromDb } from './api/firebaseInstances'
import firebase from 'firebase'

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
    }
  }

  componentDidMount = () => {
    const {id} = this.props.match.params
    console.log('category id '+ id)
    this.loadCategories(id)
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
    console.log(newSt['matchedCategory'])
    this.loadPages(newSt['categoryKey'])
  }
  
  loadPages = (key) => {
    const adminAppdatabase = firebase.database()
    const pagesData = adminAppdatabase.ref().child('Pages')
    var pages = []
    let matchedPages = []
    //get all pages 
    pagesData.on('value', (snap) => {
      snap.forEach((cat) => {
        pages.push({
          key: cat.key,
          ...cat.val()
        })
      })
    //filter pages and return category pages
    pages.forEach(page => {
      if (page.pageCategory == (key) ) {
        matchedPages.push(page )
      }
    })
    //save data to state
    let newSt = this.state
    newSt['matchedPages'] = matchedPages
    this.setState(newSt)      
  })
  }

  componentWillReceiveProps = (nextProps) => {
    const currentLocation = this.props.match.url
    const nextLocation = nextProps.match.url
    const { id } = nextProps.match.params

    if(currentLocation !== nextLocation) {
      console.log('C W R P')
      this.loadCategories(id)  
    }
  }

  render () {
    const { matchedCategory, matchedPages } = this.state    
    const { pages } = this.state
    return (
      <div>
      <br/>
      <h2> Matched category: {matchedCategory.name}</h2>
        <br />
        <h2> here is the category page</h2>
        <h3>pages:</h3>
        <ul>
          {matchedPages.map(page => <li key={page.pageName}>{page.pageName}
          </li>)}
        </ul>
      </div>
    )
  }
}
export default Category
