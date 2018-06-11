import React, { Component } from 'react'
import { Form, Col, FormGroup, FormControl,ButtonToolbar, ToggleButtonGroup, ToggleButton, Alert } from 'react-bootstrap'
import firebase from 'firebase/app'
import CKEditor from 'react-ckeditor-component'
import ButtonWithIcon from '../elements/ButtonWithIcon'
import './add-carousel.scss'
import TitleWithIcon from '../elements/TitleWithIcon'
import FontAwesome from 'react-fontawesome'
import { getDataFromDb } from '../../api/firebaseInstances'
import AddPhoto from '../photosLibraray/addPhoto'


class AddCarousel extends Component {

  constructor(props) { 
    super(props)
    this.state= {
      carouselName: '',
      carouselTitle: '',
      showcarousel: '',
      carouselImage: '',
      carouselId: this.props.carouselId,
      allowSend: false,
      carouselContent: {},
      sucessAlert: false,
      carouselCategory: null,
      categoriesList: [],
    }
  }

  handleFielUploaded = (url) => {
    console.log(url+ 'category image')
    this.setState({
      carouselImage: url
    })
  }

  componentDidMount () {
    const categoriesList = getDataFromDb('Categories')
    this.setState({
      categoriesList: categoriesList,
    })
  }

  handleSubmit = (e) => {
    const { carouselName, carouselTitle, showcarousel, carouselContent, carouselId, carouselImage, carouselCategory } = this.state
    e.preventDefault()
    const adminAppdatabase = firebase.database()
    const categoriesData = adminAppdatabase.ref().child('carousels')
    categoriesData.push({
      name: carouselName,
      title: carouselTitle,
      showcarousel: showcarousel,
      content: carouselContent,
      image: carouselImage,
      carouselId: carouselId || 'there is no id provided for props',
      category: carouselCategory
    }, function(error) {
      if (error) {
        console.log('// The write failed...')
      } else {
        console.log('// Data saved successfully!')
      //TO DO:  Do something when the request comes back .... 
    } 
  })
  console.log('will be redirect to carousels')
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
      carouselContent: newContent
    })
  }

  render () {
    const { carouselContent, sucessAlert, categoriesList } = this.state
    return (
      <div className="add-carousel">
      <TitleWithIcon title='إضافة صفحة جديدة' icon='plus-circle' subTitle=''/>
      { sucessAlert && <Alert bsStyle="success">
      <FontAwesome name='check-circle' size='2x'/> {'  '}
      <strong>تم بنجاح</strong>
      
      </Alert> }
        <hr />
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId='formHorizontalEmail'>
            <Col sm={10}>
              <FormControl type='text' name='carouselName' placeholder='اختر اسم للصفحه ' onChange={this.handleInput} required/>
            </Col>
            <Col sm={2}>اسم الصفحه</Col>
          </FormGroup>

          <AddPhoto uploadedFile={(url) => this.handleFielUploaded(url)} />

          <FormGroup controlId='formHorizontalEmail'>
            <Col sm={10}>
              <FormControl name='carouselTitle' type='text' placeholder='' onChange={this.handleInput}/>
            </Col>
            <Col sm={2}>اسم العرض العرض </Col>
          </FormGroup>

          <ButtonToolbar>
            <ToggleButtonGroup type="radio"  name="showcarousel" defaultValue={0} >
              <ToggleButton onClick={this.handleInput} value={1}>عرض في الصفحه الرئيسي</ToggleButton>
              <ToggleButton onClick={this.handleInput} value={0}>عدم العرض في الصفحة الرئيسية</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>

          <ButtonToolbar>
            <ToggleButtonGroup type="radio"  name="carouselCategory" defaultValue={0} >
            {categoriesList.map(cat => <ToggleButton onClick={this.handleInput} value={cat.key}>{cat.name}</ToggleButton>)}
            </ToggleButtonGroup>
          </ButtonToolbar>
          <br/>
          <br/>


          <CKEditor 
            name='content'
            activeClass='p10' 
            content={carouselContent} 
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

export default Addcarousel

