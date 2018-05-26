import React, { Component } from 'react'
import { Form, Col, FormGroup, FormControl, Button } from 'react-bootstrap'
import firebase from 'firebase/app'

class AddCategory extends Component {

  constructor(props) { 
    super(props)
    this.state= {
      categoryName: '',
      categoryTitle: '',
      showCategory: '',
      allowSend: false
    }
  }

  handleSubmit = (e) => {
    const {  categoryName, categoryTitle, showCategory } = this.state
    e.preventDefault()
    const adminAppdatabase = firebase.database()
    const categoriesData = adminAppdatabase.ref().child('Categories')
    categoriesData.push({
      categoryName: categoryName,
      categoryTitle: categoryTitle,
      showCategory: showCategory
    }, function(error) {
      if (error) {
        console.log('// The write failed...')
      } else {
        console.log('// Data saved successfully!')
      //TO DO:  Do something when the request comes back .... 
    } 
  })
  console.log('will be redirect to categories')
  setTimeout(() => {
    this.props.onFormSent()
  }, 1000);
  
  }

  handleInput = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  render () {

    
    return (
      <div >
        <hr />
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId='formHorizontalEmail'>
            <Col sm={10}>
              <FormControl type='text' name='categoryName' placeholder='ادهل اسم للقسم' onChange={this.handleInput}/>
            </Col>
            <Col sm={2}>
            اسم القسم            </Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalEmail'>
            <Col sm={10}>
              <FormControl name='categoryTitle' type='text' placeholder='' onChange={this.handleInput}/>
            </Col>
            <Col sm={2}>عنوان العرض </Col>
          </FormGroup>

          <FormGroup controlId='formControlsSelect'>
            <Col sm={10}>
              <FormControl name='showCategory' componentClass='select' placeholder='select' onChange={this.handleInput}>
                <option value='0'>عرض في الأقسام</option>
                <option value='1'>عدم العرض</option>
              </FormControl>
            </Col>
            <Col sm={2}>خيارات العرض </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={6} sm={6}>
              <Button type='submit'>أضافة قسم</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default AddCategory

