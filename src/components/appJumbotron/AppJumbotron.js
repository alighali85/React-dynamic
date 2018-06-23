
import React, { Component } from 'react'
import { Jumbotron, Button, Grid } from 'react-bootstrap'
import './app-jumbotron.scss'
import PropTypes from 'prop-types'

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array
}

const defaultProps = {
  title: 'default title',
  content: [
    {
      name: 'name',
      content: 'content'
    }
  ]
}

class AppJumbotron extends Component {
  render () {
    const { title, content } = this.props
    const featuredItem = content.slice(content.length - 1, content.length)
    content.pop()
    return (
      <Grid className='app-jumbotron'>
        <Jumbotron>
          <div>
            <h2 className='app-jumbotron__headline'>{title}</h2><hr />
            {featuredItem.map(item => <div className='app-jumbotron__featured'>
              <h3 className='app-jumbotron__featured-name'>{item.name}</h3>
              <img className='app-jumbotron__featured-image' src={item.image} alt={item.name} />
              <p className='app-jumbotron__featured-title'>{item.title} ...
                <a className='app-jumbotron__featured-more-link'>المزيد</a>
              </p>
            </div>)}
            {content.map(item => <div className='app-jumbotron__related'>
              <img className='app-jumbotron__related-image' src={item.image} alt={item.name} />
              <h3 className='app-jumbotron__related-name'>{item.name}</h3>
              <p className='app-jumbotron__related-title'>{item.title}</p>
            </div>)}
            <hr />            {this.props.children}
            <p>
              <Button bsStyle='primary' />
            </p>
          </div>
        </Jumbotron>
      </Grid>
    )
  }
}

AppJumbotron.propTypes = propTypes
AppJumbotron.defaultProps = defaultProps

export default AppJumbotron
