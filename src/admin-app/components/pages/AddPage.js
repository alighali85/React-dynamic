import React, { Component } from 'react'
import { Form, Col, FormGroup, FormControl,ButtonToolbar, ToggleButtonGroup, ToggleButton, Alert } from 'react-bootstrap'
import firebase from 'firebase/app'
import CKEditor from 'react-ckeditor-component'
import ButtonWithIcon from '../elements/ButtonWithIcon'
import './add-page.scss'
import TitleWithIcon from '../elements/TitleWithIcon'
import FontAwesome from 'react-fontawesome'
import { getDataFromDb } from '../../api/firebaseInstances'
import AddPhoto from '../photosLibraray/addPhoto'


class AddPage extends Component {

  constructor(props) { 
    super(props)
    this.state= {
      pageName: '',
      pageTitle: '',
      showInFrontPage: 0,
      showOnfooter: '0',
      pageInSlide: '',
      pageImage: '',
      pageId: this.props.pageId,
      allowSend: false,
      pageContent: {},
      sucessAlert: false,
      pageCategory: null,
      categoriesList: [],
    }
  }

  handleFielUploaded = (url) => {
    console.log(url+ 'category image')
    this.setState({
      pageImage: url
    })
  }

  componentDidMount () {
    const categoriesList = getDataFromDb('Categories')
    this.setState({
      categoriesList: categoriesList,
    })
  }

  handleSubmit = (e) => {
    const { 
      pageName, 
      pageTitle, 
      showInFrontPage, 
      pageContent, 
      pageId, 
      pageImage, 
      pageCategory, 
      pageInSlide, 
      showOnfooter
     } = this.state

    e.preventDefault()
    const adminAppdatabase = firebase.database()
    const categoriesData = adminAppdatabase.ref().child('Pages')
    categoriesData.push({
      name: pageName,
      title: pageTitle,
      showInFrontPage: showInFrontPage,
      showOnfooter: showOnfooter,
      pageInSlide: pageInSlide,
      content: pageContent,
      image: pageImage,
      pageId: pageId || 'there is no id provided for props',
      category: pageCategory
    }, function(error) {
      if (error) {
        console.log('// The write failed...')
      } else {
        console.log('// Data saved successfully!')
      //TO DO:  Do something when the request comes back .... 
    } 
  })
  console.log('will be redirect to pages')
  this.setState({
    sucessAlert: true
  })
  setTimeout(() => {
    this.setState({
      sucessAlert: true
    })
    this.props.onFormSent()
  }, 2000);
  
  }

  handleInput = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
 
  handleCKInput = (evt) => {
    const newContent = evt.editor.getData()
    this.setState({
      pageContent: newContent
    })
  }

  render () {
    const { pageContent, sucessAlert, categoriesList } = this.state
    return (
      <div className="add-page">
      <TitleWithIcon title='إضافة صفحة جديدة' icon='plus-circle' subTitle=''/>
      { sucessAlert && <Alert bsStyle="success">
      <FontAwesome name='check-circle' size='2x'/> {'  '}
      <strong>تم بنجاح</strong>
      
      </Alert> }
        <hr />
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId='formHorizontalEmail'>
            <Col sm={10}>
              <FormControl type='text' name='pageName' placeholder='اختر اسم للصفحه ' onChange={this.handleInput} required/>
            </Col>
            <Col sm={2}>اسم الصفحه</Col>
          </FormGroup>
          <hr/>

          <FormGroup controlId='pagePhoto'>
            <Col sm={9}>
              <AddPhoto uploadedFile={(url) => this.handleFielUploaded(url)} />
            </Col>
            <Col sm={3}>اختر صورة رئيسية </Col>
            </FormGroup>
          <hr/>

          <FormGroup controlId='formHorizontalEmail'>
            <Col sm={10}>
              <FormControl name='pageTitle' type='text' placeholder='' onChange={this.handleInput}/>
            </Col>
            <Col sm={2}>ملخص عن الصفحة </Col>
          </FormGroup>
          <hr/>

          <ButtonToolbar>
            <Col sm={3}>خيارات العرض في الصفحة الرئيسية </Col>
            <Col sm={9}>
              <ToggleButtonGroup type="radio" name="showInFrontPage" defaultValue={0} >
                <ToggleButton onClick={this.handleInput} value={1}>عرض في الصفحه الرئيسي</ToggleButton>
                <ToggleButton onClick={this.handleInput} value={0}>عدم العرض في الصفحة الرئيسية</ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </ButtonToolbar>
          <hr/>

          <ButtonToolbar>
            <Col sm={3}>خيارات العرض في السلايد </Col>
            <Col sm={9}>
              <ToggleButtonGroup type="radio" name="pageInSlide" defaultValue={0} >
                <ToggleButton onClick={this.handleInput} value={1}>عرض في السلايد</ToggleButton>
                <ToggleButton onClick={this.handleInput} value={0}>عدم العرض في السلايد</ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </ButtonToolbar>
          <hr/>

          <ButtonToolbar>
            <Col sm={3}>عرض في الفوتر</Col>
            <Col sm={9}>
              <ToggleButtonGroup type="radio" name="showOnfooter" defaultValue={0} >
                <ToggleButton onClick={this.handleInput} value={1}>عرض في الفوتر</ToggleButton>
                <ToggleButton onClick={this.handleInput} value={0}>عدم العرض في الفوتر</ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </ButtonToolbar>
          <hr/>

          <ButtonToolbar>
            <Col sm={3}>اختر قسم</Col>
            <Col sm={9}>
              <ToggleButtonGroup type="radio" name="pageCategory" defaultValue={0} >
              {categoriesList.map(cat => <ToggleButton onClick={this.handleInput} value={cat.key}>{cat.name}</ToggleButton>)}
              </ToggleButtonGroup>
            </Col>
          </ButtonToolbar>
          <br/>
          <br/>


          <CKEditor 
            scriptUrl='https://cdn.ckeditor.com/4.9.2/full-all/ckeditor.js'
            name='content'
            activeClass='p10' 
            content={pageContent} 
            events={{
              'change': this.handleCKInput
            }}
          />

          <FormGroup>
            <Col smOffset={6} sm={6}>
            <ButtonWithIcon
              text='إضافة صفحة'
              iconName='plus-circle'
              ButtonStyle='success'
              float='left'
              type='submit'
            />
            </Col>
          </FormGroup>
             
        </Form>
      </div>
    )
  }
}

export default AddPage

