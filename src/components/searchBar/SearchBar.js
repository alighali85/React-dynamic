import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import './search-bar.scss'

export class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allItems : this.props.source,
      searchResult: []
    }
  }

  handleSearchInput = (e) => {
    const { value } = e.target
    const list = this.props.source
    let r = []
    const result = list.filter(item => item.name.indexOf(value) > -1)
    if ( value.length > 0 ) {
      this.setState({
        searchResult: result
      })
    }
    else {
      this.resetSearch()
    }
  }

  resetSearch = () => {
    this.setState({
      searchResult: []
    })
  }

  render () {
    const { searchResult } = this.state
    return (
      <div className='search-bar'>
      <Panel>
        <h4 className='search-bar__headline'>
        <FontAwesome name="search" /> {'   '}إبحث هنا
        </h4>
        <input className='search-bar__input' placeHolder='إبحث هنا عن أي معلومة' onChange={this.handleSearchInput} />
        <div clasname='search-bar__results'>
        <ul>
        {searchResult.length > 0 &&  <FontAwesome name="times" onClick={this.resetSearch} />}
        {searchResult.length > 0 &&  `:نتائج البحث الأخيرة `}
        {searchResult.map(item => <li><Link to={`/category/page/${item.pageId}`}>{item.name}</Link></li>)}
        </ul>
        </div>
        </Panel>
      </div>
    )
  }
}

export default SearchBar
