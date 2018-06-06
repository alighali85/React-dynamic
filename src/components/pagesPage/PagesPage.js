import React from 'react'
import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap'
import './pages-page.scss'

const propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  text: PropTypes.strging
}

const defaultProps = {
  title: 'page title',
  link: '/',
  text: 'page text'
}

export default class PagesPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { title, text, link, image } = this.props
    return (
      <div className='pages-page'>
        <Panel className='pages-page__panel'>
          <Panel.Heading className='pages-page__header'>
            <img src={image} className='pages-page__image' alt='page' />
            <h3 className='pages-page__title'>{title}</h3>
          </Panel.Heading>
          <Panel.Body className='pages-page__text'>{text}</Panel.Body>
          <button>{link}</button>
        </Panel>
      </div>
    )
  }
}

PagesPage.propTypes = propTypes
PagesPage.defaultProps = defaultProps
