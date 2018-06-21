import React, { Component } from 'react'
import { Form, Col, FormGroup, FormControl, Button } from 'react-bootstrap'
import firebase from 'firebase/app'

class EditCategory extends Component {

  constructor(props) { 
    super(props)
    this.state = {
      name: '',
      title: '',
      showOnFrontpage: null,
      categoryKey: this.props.Categorykey,
      allowSend: false
    }
  }
  
  componentDidMount () {
    const adminAppdatabase = firebase.database()
    const categoriesData = adminAppdatabase.ref('Categories').child(this.state.categoryKey)
    categoriesData.on('value', (snap) => {
      const { name, title, showOnFrontpage } = snap.val()
      this.setState({
        name: name,
        title: title,
        showOnFrontpage: showOnFrontpage,
        newCategoryInfo: null,
        allowSend: true
      })
    })
  }
  
  handleUpdateCategory = (e) => {
    e.preventDefault()
    const { categoryKey, name, title, showOnFrontpage  } = this.state
    firebase.database().ref('Categories/' + categoryKey).update({
      name: name,
      title: title,
      showOnFrontpage: showOnFrontpage
    })
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

    const { name, title, showOnFrontpage } = this.state
    return (
      <div >
        <Form horizontal onSubmit={this.handleUpdateCategory}>

          <FormGroup controlId='formHorizontalEmail'>
            <Col sm={10}>
              <FormControl type='text' value={name} name='name' placeholder='ادهل اسم للقسم' onChange={this.handleInput}/>
            </Col>
            <Col sm={2}>اسم القسم</Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalEmail'>
            <Col sm={10}>
              <FormControl name='title' type='text' value={title} placeholder='' onChange={this.handleInput}/>
            </Col>
            <Col sm={2}>عنوان العرض </Col>
          </FormGroup>

          <FormGroup controlId='formControlsSelect'>
            <Col sm={10}>
              <FormControl 
              name='showOnFrontpage' 
              componentClass='select' 
              value={showOnFrontpage}
              placeholder='select' 
              onChange={this.handleInput}
              >
                <option value='1'>عرض في الصفحة الرئيسية</option>
                <option value='0'>عدم العرض في الصفحة الرئيسية</option>
              </FormControl>
            </Col>
            <Col sm={2}> خيارات العرض في الصفحة الرئيسية </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={6} sm={6}>
              <Button type='submit'>تعديل القسم</Button>
            </Col>
          </FormGroup>

        </Form>
      </div>
    )
  }
}

export default EditCategory
