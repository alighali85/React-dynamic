import React, { Component } from 'react'
import './login.scss'
import { Grid, Form, FormGroup, Col, FormControl, Button, ControlLabel, Checkbox } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { requestSigin } from '../auth/auth'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
        email: '',
        password: ''
    }
  }

  handelInput = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handelLogin = (e) => {
    e.preventDefault()
    console.log( 'handel login >> ')
    const {email, password} = this.state
    
    const signin = requestSigin(email, password)
    console.log('sigin'+ signin)
    if (signin){
      console.log('ther user is signed! Success '+ signin)
    }
  }


  render () {
    return (
      <div className='login-page-wrapper'>
        <Grid>
          <Col md={6} mdOffset={3}>
            <Form horizontal className='admin-login-form' onSubmit={this.handelLogin}>
              <h2>
                <FontAwesome name='user-lock' size='2x' className='user-lock' />
                تسجيل الدخول
              </h2>
              <br />
              <FormGroup controlId='formHorizontalEmail '>
                <Col sm={12} xs={12}>
                  <FormControl 
                  type='email' 
                  name='email' 
                  placeholder='الإيميل' 
                  onChange={(e) => this.handelInput(e)} 
                  value={this.state.email}
                />
                </Col>
              </FormGroup>

              <FormGroup controlId='formHorizontalPassword'>
                <Col sm={12} xs={12}>
                  <FormControl 
                  type='password' 
                  name='password' 
                  placeholder='كلمة المرور' 
                  onChange={(e) => this.handelInput(e)} 
                  value={this.state.password}
                />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={12} xs={12}>
                  <Button type='submit' className='btn-login'>
                    <FontAwesome name='rocket' size='2x' className='rocker-spin' />
                  تسحيل الدخول</Button>
                </Col>
              </FormGroup>
            </Form>

          </Col>
        </Grid>
      </div>
    )
  }
}

export default Login
