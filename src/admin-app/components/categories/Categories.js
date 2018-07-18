import React, { Component } from 'react'
import './categories.scss'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import firebase from 'firebase/app'
import DeleteIcon from '../../assets/images/delete-button.svg'
import EditIcon from '../../assets/images/edit.svg'
import PagesIcon from '../../assets/images/pages.svg'
import ListDots from '../../assets/images/list-dots.svg'
import AddCategory from './AddCategory'
import EditCategory from './EditCategory'
import ConfirmWindow from '../confirmWindow/ConfirmWindow'
import TitleWithIcon from '../elements/TitleWithIcon'
import ButtonWithIcon from '../elements/ButtonWithIcon'
import Loader from '../elements/Loader'

class Categories extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cat: [],
      showConfirm: false,
      addCategoryMode: false,
      editCategoryMode: false,
      holdCatId: null,
      categoryToEdit: null,
      loading: true,
      nextCategoryId: null
    }
  }

  componentDidMount () {
    window.scrollTo(0, 0);
    const adminAppdatabase = firebase.database()
    const categoriesData = adminAppdatabase.ref().child('Categories')
    categoriesData.on('value', (snap) => {
      let categories = []
      snap.forEach((cat) => {
        categories.push({
          key: cat.key,
          ...cat.val()
        })
      })
      const lastPage = categories.slice(categories.length - 1)
      const lastCategoryId = lastPage[0].id
      this.setState({
        cat: categories.reverse(),
        loading: false,
        nextCategoryId: lastCategoryId
      })
    })
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

  exitAddCategoryMode = () => {
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

  exitEditCategoryMode = () => {
    this.setState({
      editCategoryMode: false
    })
  }

  render () {
    const { cat, showConfirm, addCategoryMode, editCategoryMode, categoryToEdit, loading, nextCategoryId } = this.state
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
        {loading && <Loader iconSize='2x'/>}
        {cat.map((item, i) => <ListGroup key={i}>
          <ListGroupItem header={item.name - i} >
            <img className='list-user-icon' src={DeleteIcon} alt='delete' 
            name={item.key} 
            onClick={(e)=> this.handleDeleterequest(e)} />

            <img className='list-user-icon' src={EditIcon} alt='edit'
            name={item.key}
            onClick={this.editCategoryMode}/>

            <img className='list-user-icon' src={PagesIcon} alt='Pages' />
            <img className='list-icon' src={ListDots} alt='dots' />{item.name} </ListGroupItem>
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
          onDismiss={this.exitAddCategoryMode}
          title='إضافة قسم رئيسي'
          text='جميع الحقول مطلوبة '>
          <AddCategory onFormSent={this.exitAddCategoryMode} nextCategoryId={nextCategoryId}/>
        </ConfirmWindow>
        
        <ConfirmWindow 
          show={editCategoryMode}
          onDismiss={this.exitEditCategoryMode}
          title='تعديل قسم رئيسي'
          text='جميع الحقول مطلوبة '>
          <EditCategory Categorykey={categoryToEdit} 
          onFormSent={this.exitEditCategoryMode} 
          />
        </ConfirmWindow>

      </div>
    )
  }
}


export default Categories
