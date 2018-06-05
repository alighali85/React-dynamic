import React, { Component } from 'react'
import { Form, Col, FormGroup, FormControl, Button } from 'react-bootstrap'
import firebase from 'firebase/app'

class EditCategory extends Component {

  constructor(props) { 
    super(props)
    this.state= {
      name: '',
      title: '',
      active: '',
      categoryKey: this.props.Categorykey,
      allowSend: false
    }
  }

  
  componentDidMount () {
    const adminAppdatabase = firebase.database()
    const categoriesData = adminAppdatabase.ref('Categories').child(this.state.categoryKey)
    categoriesData.on('value', (snap) => {
      const { name, title, active } = snap.val()
      this.setState({
        name: name,
        title: title,
        active: active,
        newCategoryInfo: null,
        allowSend: true
      })
    })
  }
  
  handleUpdateCategory = (e) => {
    e.preventDefault()
    const { categoryKey, name, title, active  } = this.state
    firebase.database().ref('Categories/' + categoryKey).update({
      name: name,
      title: title,
      active: active
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

    const { name, title, active } = this.state
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
              <FormControl name='active' componentClass='select' value={active} placeholder='select' onChange={this.handleInput}>
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

export default EditCategory
