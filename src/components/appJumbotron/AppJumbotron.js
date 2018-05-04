
import React, { Component } from 'react'
import { Jumbotron, Button, Grid } from 'react-bootstrap'
import './app-jumbotron.scss'

class componentName extends Component {
  render () {
    const {source} = this.props
    return (
      <Grid>
        <Jumbotron>
          { source.map(jum => (<div>
            <h2>{jum.title}</h2>
            <br />
            <p>
              {jum.content}
              <br />
            </p>
            {this.props.children}
            <p>
              <Button bsStyle='primary'> {jum.button}</Button>
            </p>
          </div>
          ))}
        </Jumbotron>
      </Grid>

    )
  }
}

export default componentName
