import React, { Component } from 'react'
import AppNavBar from './components/appNavBar/AppNavBar.js'
import NavTabs from './components/navTabs/NavTabs'
import AppFooter from './components/appFooter/AppFooter'
import Category from './Category'
import { Route, Switch } from 'react-router-dom'
import { Grid, Col, Panel } from 'react-bootstrap'
import Page from './Page'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentId: 0
    }
  }

  componentDidMount () {
    // console.log('component Did Mount')
  }

  componentWillUpdate (nextProps, nextState) {
    // console.log('component Will update')
  }
  componentDidUpdate (prevProps, prevState) {
    // console.log('component Did update')
  }

  componentWillReceiveProps (nextProps) {
    // console.log('component Will receive props')
    if (this.props.match.url !== nextProps.match.url) {
      this.setState({
        currentId: nextProps.match.url
      })
    }
  }

  render () {
    return (
      <div className='App block'>
        <AppNavBar children={<NavTabs />} />
        <Grid>
          <Col md={8} lg={8}>

            <Switch>
              <Route path='/category/:id' component={Category} />
              <Route path='/category/:id/page/:id' component={Page} />
            </Switch>

          </Col>
          <Col md={4} lg={4}>
            <div>
              <br /><br />
              <Panel>
                <Panel.Heading>Panel heading without a title</Panel.Heading>
                <Panel.Body>Panel content</Panel.Body>
                <Panel.Body>Panel content</Panel.Body>
                <Panel.Body>Panel content</Panel.Body>
              </Panel>
              <Panel>
                <Panel.Heading>
                  <Panel.Title componentClass='h3'>Panel heading with a title</Panel.Title>
                </Panel.Heading>
                <Panel.Body>Panel content</Panel.Body>
                <Panel.Body>Panel content</Panel.Body>
                <Panel.Body>Panel content</Panel.Body>
              </Panel>

              <Panel>
                <Panel.Heading>Panel heading without a title</Panel.Heading>
                <Panel.Body>Panel content</Panel.Body>
              </Panel>
              <Panel>
                <Panel.Heading>
                  <Panel.Title componentClass='h3'>Panel heading with a title</Panel.Title>
                </Panel.Heading>
                <Panel.Body>Panel content</Panel.Body>
                <Panel.Body>Panel content</Panel.Body>
                <Panel.Body>Panel content</Panel.Body>
              </Panel>

              <Panel>
                <Panel.Heading>Panel heading without a title</Panel.Heading>
                <Panel.Body>Panel content</Panel.Body>
              </Panel>
              <Panel>
                <Panel.Heading>
                  <Panel.Title componentClass='h3'>Panel heading with a title</Panel.Title>
                </Panel.Heading>
                <Panel.Body>Panel content</Panel.Body>
              </Panel>

              <Panel>
                <Panel.Heading>Panel heading without a title</Panel.Heading>
                <Panel.Body>Panel content</Panel.Body>
              </Panel>
              <Panel>
                <Panel.Heading>
                  <Panel.Title componentClass='h3'>Panel heading with a title</Panel.Title>
                </Panel.Heading>
                <Panel.Body>Panel content</Panel.Body>
              </Panel>
            </div>;
          </Col>
        </Grid>
        <AppFooter />
      </div>
    )
  }
}

export default App
