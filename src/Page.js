import React from 'react'
import { getDataFromDb } from './admin-app/api/firebaseInstances'

export default class Page extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      page: null,
      pageId: null,
      pageKey: null,
      pageContent: null
    }
  }

  componentDidMount () {
    const { id } = this.props.match.params
    const pages = getDataFromDb('Pages')
    pages.forEach(item => {
      if (item.pageId == id) {
        this.setState({
          page: item.pageName,
          pageId: id,
          pageKey: item.key,
          pageContent: item.pageContent
        })
      }
    })
  }

  render () {
    console.log(this.state)
    const { page, pageContent } = this.state
    return (
      <div>
        <h2>{page}</h2>
        <div id='pageContent2' dangerouslySetInnerHTML={{ __html: pageContent }} />
      </div>
    )
  }
}
