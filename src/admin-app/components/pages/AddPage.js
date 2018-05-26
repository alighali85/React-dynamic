import React, { Component } from 'react'
import { Form, Col, FormGroup, FormControl,ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import firebase from 'firebase/app'
import CKEditor from 'react-ckeditor-component'
import ButtonWithIcon from '../elements/ButtonWithIcon'
import './add-page.scss'
import TitleWithIcon from '../elements/TitleWithIcon'


class AddPage extends Component {

  constructor(props) { 
    super(props)
    this.state= {
      pageName: '',
      pageTitle: '',
      showPage: '',
      pageId: this.props.pageId,
      allowSend: false,
      pageContent: {}
    }
  }

  componentDidMount = () => {
    
  }
  

  handleSubmit = (e) => {
    const { pageName, pageTitle, showPage, pageContent,pageId } = this.state
    e.preventDefault()
    const adminAppdatabase = firebase.database()
    const categoriesData = adminAppdatabase.ref().child('Pages')
    categoriesData.push({
      pageName: pageName,
      pageTitle: pageTitle,
      showpage: showPage,
      pageContent: pageContent,
      pageId: pageId || 'there is no id provided fro props'
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
    console.log(name + '     '+ value  )
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
    return (
      <div className="add-page">
      <TitleWithIcon title='إضافة صفحة جديدة' icon='plus-circle' subTitle=''/>

        <hr />
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId='formHorizontalEmail'>
            <Col sm={10}>
              <FormControl type='text' name='pageName' placeholder='اختر اسم للصفحه ' onChange={this.handleInput} required/>
            </Col>
            <Col sm={2}>اسم الصفحه</Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalEmail'>
            <Col sm={10}>
              <FormControl name='pageTitle' type='text' placeholder='' onChange={this.handleInput}/>
            </Col>
            <Col sm={2}>اسم العرض العرض </Col>
          </FormGroup>
          <ButtonToolbar>
            <ToggleButtonGroup type="radio"  name="showPage" defaultValue={0} >
              <ToggleButton onClick={this.handleInput} value={1}>عرض في الصفحه الرئيسي</ToggleButton>
              <ToggleButton onClick={this.handleInput} value={0}>عدم العرض في الصفحة الرئيسية</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
            <br/>
            <br/>

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
              text='إضافة صفحة'
              iconName='magic'
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

