import React, { Component } from 'react'
import { Form, Col, FormGroup, FormControl, Button } from 'react-bootstrap'
import firebase from 'firebase/app'
import AddPhoto from '../photosLibraray/addPhoto'

class AddCategory extends Component {

  constructor(props) { 
    super(props)
    this.state= {
      id: this.props.nextCategoryId,
      name: null,
      title: null,
      description: null,
      image: null,
      showOnFrontpage: '1',
      allowSend: false
    }
  }

  handleFielUploaded = (url) => {
    this.setState({
      image: url
    })
  }

  handleSubmit = (e) => {
    const { id, name, title, description, image, showOnFrontpage } = this.state
    e.preventDefault()
    const adminAppdatabase = firebase.database()
    const categoriesData = adminAppdatabase.ref().child('Categories')
    if(id && name && title && image ) {
      categoriesData.push({
      id: id + 1,
      name: name,
      title: title,
      description: description,
      image: image,
      showOnFrontpage: showOnFrontpage,
    }, function(error) {
      if (error) {
        console.log('// The write failed...')
      } else {
        console.log('// Data saved successfully!')
      //TO DO:  Do something when the request comes back .... 
    } 
    })
  } 
  else {
    alert('الرجاء ملئ جميع الحقول')
    return false
  }
    
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
              <FormControl type='text' name='name' placeholder='ادهل اسم للقسم' onChange={this.handleInput}/>
              </Col>
              <Col sm={2}>
              اسم القسم
              </Col>
            </FormGroup>
            <AddPhoto uploadedFile={(url)=> this.handleFielUploaded(url)} />
            <FormGroup controlId='formHorizontalEmail'>
              <Col sm={10}>
                <FormControl name='title' type='text' placeholder='' onChange={this.handleInput}/>
              </Col>
              <Col sm={2}>عنوان العرض </Col>
            </FormGroup>

            <FormGroup controlId='formControlsSelect'>
              <Col sm={10}>
                <FormControl name='showOnFrontpage' defaultValue='1' componentClass='select' placeholder='select' onChange={this.handleInput}>
                  <option value='0'>اختر من هنا</option>
                  <option value='1'>عرض في الصفحة الرئيسية</option>
                  <option value='0'>عدم العرض في الصفحة الرئيسية</option>
                </FormControl>
              </Col>
              <Col sm={2}> خيارات العرض في الصفحة الرئيسية </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={6} sm={6}>
                <Button type='submit'>إضافة قسم</Button>
              </Col>
            </FormGroup>
        </Form>
      </div>
    )
  }
}

export default AddCategory

