import React, { Component } from 'react'
import './categories.scss'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import * as firebase from 'firebase'
import DeleteIcon from '../../assets/images/delete-button.svg'
import EditIcon from '../../assets/images/edit.svg'
import PagesIcon from '../../assets/images/pages.svg'
import ListDots from '../../assets/images/list-dots.svg'
import AddCategory from './AddCategory'
import EditCategory from './EditCategory'
import ConfirmWindow from '../confirmWindow/ConfirmWindow'
import TitleWithIcon from '../elements/TitleWithIcon'
import ButtonWithIcon from '../elements/ButtonWithIcon';

class Categories extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cat: [],
      showConfirm: false,
      addCategoryMode: false,
      editCategoryMode: false,
      holdCatId: null,
      categoryToEdit: null
    }
  }

  // Control Delet Category 
  handleDeleterequest = (e) => {
    const { name } = e.target
    this.setState({
      showConfirm: true,
        holdCatId: name
    })
  }

  handleDeleteItem = () => {
    const { holdCatId } = this.state
    firebase.database().ref('Categories').child(holdCatId).remove()
    this.setState({
      showConfirm: false,
      holdCatId: null
    })
  }

  dismissConfirmation = () => {
    this.setState({
      showConfirm: false,
      holdCatId: null
    })
  }

  // Control Add Category 
  addCategoryMode = () => {
    this.setState({
      addCategoryMode: true
    })
  }

  ExitAddCategoryMode = () => {
    this.setState({
      addCategoryMode: false
    })
  }

  // control Edit Category 
  editCategoryMode = (e) => {
    const { name } = e.target
    this.setState({
      editCategoryMode: true,
      categoryToEdit: name
    })
  }

  ExitEditCategoryMode = () => {
    this.setState({
      editCategoryMode: false
    })
  }

  componentWillMount () {
    const adminAppdatabase = firebase.database()
    const categoriesData = adminAppdatabase.ref().child('Categories')
    categoriesData.on('value', (snap) => {
      var categories = []
      snap.forEach((cat) => {
        categories.push({
          key: cat.key,
          ...cat.val()
        })
      })
      this.setState({
        cat: categories
      })
    })
  }

  render () {
    const { cat, showConfirm, addCategoryMode, editCategoryMode, categoryToEdit } = this.state
    return (
      <div className='admin-categories'>

        <TitleWithIcon
          title='إدارة الأقسام'
          icon='warehouse'
        />

        <ButtonWithIcon
          onClick={this.addCategoryMode}
          text='إضافة قسم'
          iconName='magic'
          ButtonStyle='success'
          float='left'
        />

        {cat.map((item, i) => <ListGroup>
          <ListGroupItem header={item.categoryName - i} >
            <img className='list-user-icon' src={DeleteIcon} alt='delete' 
            name={item.key} 
            onClick={(e)=> this.handleDeleterequest(e)} />

            <img className='list-user-icon' src={EditIcon} alt='edit'
            name={item.key}
            onClick={this.editCategoryMode}/>

            <img className='list-user-icon' src={PagesIcon} alt='Pages' />
            <img className='list-icon' src={ListDots} alt='dots' />{item.categoryName} </ListGroupItem>
          </ListGroup>
          )}

        <ConfirmWindow confirmation
          show={showConfirm}
          onConfirm={this.handleDeleteItem}
          onDismiss={this.dismissConfirmation}
          title='حذف قسم رئيسي'
          text='حذف قسم رئيسي.. لايمكنك الإستعادة بعد الحذف'
        />
            
        <ConfirmWindow 
          show={addCategoryMode}
          onDismiss={this.ExitAddCategoryMode}
          title='إضافة قسم رئيسي'
          text='جميع الحقول مطلوبة '>
          <AddCategory onFormSent={this.ExitAddCategoryMode} />
        </ConfirmWindow>
        
        <ConfirmWindow 
          show={editCategoryMode}
          onDismiss={this.ExitEditCategoryMode}
          title='تعديل قسم رئيسي'
          text='جميع الحقول مطلوبة '>
          <EditCategory Categorykey={categoryToEdit} onFormSent={this.ExitAddCategoryMode} />
        </ConfirmWindow>

      </div>
    )
  }
}


export default Categories
