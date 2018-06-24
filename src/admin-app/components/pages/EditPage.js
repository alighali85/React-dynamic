import React, { Component } from 'react'
import { Form, Col, FormGroup, FormControl,ButtonToolbar, ToggleButtonGroup, ToggleButton, Alert } from 'react-bootstrap'
import firebase from 'firebase/app'
import CKEditor from 'react-ckeditor-component'
import ButtonWithIcon from '../elements/ButtonWithIcon'
import AddPhoto from '../photosLibraray/addPhoto'
import { getDataFromDb } from '../../api/firebaseInstances'

class EditPage extends Component {

  constructor(props) { 
    super(props)
    this.state= {
      pageName: null,
      pageTitle: null,
      showInFrontPage: null,
      showOnfooter: null,
      pageInSlide: null,
      pageImage: null,
      pageId: this.props.pageId,
      allowSend: false,
      pageContent: {},
      sucessAlert: false,
      pageCategory: null,
      categoriesList: [],
      pageKey: this.props.pagekey,
    }
  }

  componentDidMount () {
    console.log('component did mount')
    const adminAppdatabase = firebase.database()
    const pagesData = adminAppdatabase.ref('Pages').child(this.state.pageKey)
    const categoriesList = getDataFromDb('Categories')

    pagesData.on('value', (snap) => {
      const {
        name, 
        title, 
        showInFrontPage, 
        content, 
        pageId, 
        image, 
        category, 
        pageInSlide, 
        showOnfooter } = snap.val()
      console.log( snap.val() )
      this.setState({
        pageName: name,
        pageTitle: title,
        showInFrontPage: showInFrontPage,
        showOnfooter: showOnfooter,
        pageInSlide: pageInSlide,
        pageContent: content,
        pageImage: image,
        pageId: pageId || 'there is no id provided for props',
        pageCategory: category,
        categoriesList: categoriesList,
        newPageInfo: null,
        allowSend: true
      })
    })
  }
  
  handleUpdatePage = (e) => {
    e.preventDefault()
    const {
      pageKey,
      pageName, 
      pageTitle, 
      showInFrontPage, 
      pageContent, 
      pageId, 
      pageImage, 
      pageCategory, 
      pageInSlide, 
      showOnfooter} = this.state
    firebase.database().ref('Pages/' + pageKey).update({
      name: pageName,
      title: pageTitle,
      showInFrontPage: showInFrontPage,
      showOnfooter: showOnfooter,
      pageInSlide: pageInSlide,
      content: pageContent,
      image: pageImage,
      pageId: pageId || 'there is no id provided for props',
      category: pageCategory
    })
    
    setTimeout(() => {
      this.props.onFormSent()
    }, 1000);
    return false
  }

  handleInput = (e) => {
    if (e.target !== undefined && e !== undefined) {
      const { name, value } = e.target
      console.log('name  >>', e.target.name)
      console.log('value >>',  e.target.value)
        this.setState({
          [name]: value
        })
    }
  }

  handleCKInput = (evt) => {
    const newContent = evt.editor.getData()
    this.setState({
      pageContent: newContent
    })
  }

  handleFielUploaded = (url) => {
    console.log(url+ 'category image')
    this.setState({
      pageImage: url
    })
  }

  render () {
    const {
      pageName, 
      pageTitle, 
      showInFrontPage, 
      pageContent, 
      pageCategory, 
      pageInSlide, 
      showOnfooter,
      categoriesList } = this.state
    return (
      <div >
        <Form horizontal onSubmit={this.handleUpdatePage}>

          <FormGroup controlId='formHorizontalEmail'>
            <Col sm={10}>
              <FormControl type='text' value={pageName} name='pageName' placeholder='اسم الصفحة' onChange={(e)=> this.handleInput(e)}/>
            </Col>
            <Col sm={2}>اسم الصفحة</Col>
          </FormGroup>

          <FormGroup controlId='pagePhoto'>
            <Col sm={9}>
              <AddPhoto uploadedFile={(url) => this.handleFielUploaded(url)} />
            </Col>
            <Col sm={3}>اختر صورة رئيسية </Col>
            </FormGroup>
          <hr/>

          <FormGroup controlId='formHorizontalEmail'>
            <Col sm={10}>
              <FormControl name='pageTitle' value={pageTitle} type='text' placeholder='' onChange={(e)=> this.handleInput(e)}/>
            </Col>
            <Col sm={2}>ملخص عن الصفحة </Col>
          </FormGroup>
          <hr/>

          <ButtonToolbar>
            <Col sm={3}>خيارات العرض في الصفحة الرئيسية </Col>
            <Col sm={9}>
              <ToggleButtonGroup type="radio" name="showInFrontPage" value={showInFrontPage} onChange={this.handleInput}>
                <ToggleButton onClick={this.handleInput} value='1'>عرض في الصفحه الرئيسي</ToggleButton>
                <ToggleButton onClick={this.handleInput} value='0'>عدم العرض في الصفحة الرئيسية</ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </ButtonToolbar>
          <hr/>

          <ButtonToolbar>
            <Col sm={3}>خيارات العرض في السلايد </Col>
            <Col sm={9}>
              <ToggleButtonGroup type="radio" name="pageInSlide" value={pageInSlide} onChange={this.handleInput}>
                <ToggleButton onClick={this.handleInput} value='1'>عرض في السلايد</ToggleButton>
                <ToggleButton onClick={this.handleInput} value='0'>عدم العرض في السلايد</ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </ButtonToolbar>
          <hr/>

          <ButtonToolbar>
            <Col sm={3}>عرض في الفوتر</Col>
            <Col sm={9}>
              <ToggleButtonGroup type="radio" name="showOnfooter" value={showOnfooter} onChange={this.handleInput}>
                <ToggleButton onClick={this.handleInput} value='1'>عرض في الفوتر</ToggleButton>
                <ToggleButton onClick={this.handleInput} value='0'>عدم العرض في الفوتر</ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </ButtonToolbar>
          <hr/>

          <ButtonToolbar>
            <Col sm={3}>اختر قسم</Col>
            <Col sm={9}>
              <ToggleButtonGroup type="radio" name="pageCategory" value={pageCategory} onChange={this.handleInput}>
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
            text='تعديل الصفحة'
            iconName='retweet'
            ButtonStyle='info'
            float='right'
            type='submit'
          />
            </Col>
          </FormGroup>

        </Form>
      </div>
    )
  }
}

export default EditPage
