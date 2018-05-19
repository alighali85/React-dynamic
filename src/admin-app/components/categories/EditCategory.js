import React, { Component } from 'react'
import { Form, Col, FormGroup, FormControl, Button } from 'react-bootstrap'
import * as firebase from 'firebase'

class EditCategory extends Component {

  constructor(props) { 
    super(props)
    this.state= {
      categoryName: '',
      categoryTitle: '',
      showCategory: '',
      categoryKey: this.props.Categorykey,
      allowSend: false
    }
  }

  
  componentDidMount () {
    const adminAppdatabase = firebase.database()
    const categoriesData = adminAppdatabase.ref('Categories').child(this.state.categoryKey)
    categoriesData.on('value', (snap) => {
      const { categoryName, categoryTitle, showCategory } = snap.val()
      console.log( snap.val() )
      this.setState({
        categoryName: categoryName,
        categoryTitle: categoryTitle,
        showCategory: showCategory,
        newCategoryInfo: null,
        allowSend: true
      })
    })
  }
  
  handleUpdateCategory = () => {
    console.log('handle update item ' + this.state.holdCatId)
      const { categoryKey, categoryName, categoryTitle, showCategory  } = this.state
      firebase.database().ref('Categories/' + categoryKey).update({
        categoryName: categoryName,
        categoryTitle: categoryTitle,
        showCategory: showCategory
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

    const { categoryName, categoryTitle, showCategory } = this.state
    return (
      <div >
        <Form horizontal onSubmit={this.handleUpdateCategory}>

          <FormGroup controlId='formHorizontalEmail'>
            <Col sm={10}>
              <FormControl type='text' value={categoryName} name='categoryName' placeholder='ادهل اسم للقسم' onChange={this.handleInput}/>
            </Col>
            <Col sm={2}>اسم القسم</Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalEmail'>
            <Col sm={10}>
              <FormControl name='categoryTitle' type='text' value={categoryTitle} placeholder='' onChange={this.handleInput}/>
            </Col>
            <Col sm={2}>عنوان العرض </Col>
          </FormGroup>

          <FormGroup controlId='formControlsSelect'>
            <Col sm={10}>
              <FormControl name='showCategory' componentClass='select' value={showCategory} placeholder='select' onChange={this.handleInput}>
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
