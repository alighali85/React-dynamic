import React, { Component } from 'react'
import { Form, Col, FormGroup, FormControl } from 'react-bootstrap'
import firebase from 'firebase/app'
import CKEditor from 'react-ckeditor-component'
import ButtonWithIcon from '../elements/ButtonWithIcon'

class EditPage extends Component {

  constructor(props) { 
    super(props)
    this.state= {
      pageName: '',
      pageTitle: '',
      showpage: '',
      pageKey: this.props.pagekey,
      allowSend: false
    }
  }

  
  componentDidMount () {
    const adminAppdatabase = firebase.database()
    const pagesData = adminAppdatabase.ref('Pages').child(this.state.pageKey)
    pagesData.on('value', (snap) => {
      const { pageName, pageTitle, showPage } = snap.val()
      console.log( snap.val() )
      this.setState({
        pageName: pageName,
        pageTitle: pageTitle,
        showPage: showPage,
        newPageInfo: null,
        allowSend: true
      })
    })
  }
  
  handleUpdatePage = (e) => {
    e.preventDefault()
    const { pageKey, pageName, pageTitle, showPage  } = this.state
    firebase.database().ref('Pages/' + pageKey).update({
      pageName: pageName,
      pageTitle: pageTitle,
      showpage: showPage
    })
    
    console.log('will be redirect to Pages')
    setTimeout(() => {
      this.props.onFormSent()
    }, 1000);
    return false
  }


  handleInput = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
    console.log(this.state[name])
  }

  handleCKInput = (evt) => {
    const newContent = evt.editor.getData()
    this.setState({
      pageContent: newContent
    })
  }

  render () {

    const { pageName, pageTitle, showPage } = this.state
    return (
      <div >
        <Form horizontal onSubmit={this.handleUpdatePage}>

          <FormGroup controlId='formHorizontalEmail'>
            <Col sm={10}>
              <FormControl type='text' value={pageName} name='pageName' placeholder='ادهل اسم للقسم' onChange={this.handleInput}/>
            </Col>
            <Col sm={2}>اسم القسم</Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalEmail'>
            <Col sm={10}>
              <FormControl name='pageTitle' type='text' value={pageTitle} placeholder='' onChange={this.handleInput}/>
            </Col>
            <Col sm={2}>عنوان العرض </Col>
          </FormGroup>

          <FormGroup controlId='formControlsSelect'>
            <Col sm={10}>
              <FormControl name='showPage' componentClass='select' value={showPage} placeholder='select' onChange={this.handleInput}>
                <option value='0'>عرض في الأقسام</option>
                <option value='1'>عدم العرض</option>
              </FormControl>
            </Col>
            <Col sm={2}>خيارات العرض </Col>
          </FormGroup>

          <CKEditor 
            name='content'
            activeClass='p10' 
            content={this.state.pageContent} 
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
