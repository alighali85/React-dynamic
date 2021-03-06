import React, { Component } from 'react'
import './pages.scss'
import { ListGroup, ListGroupItem, Badge } from 'react-bootstrap'
import firebase from 'firebase/app'
import DeleteIcon from '../../assets/images/delete-button.svg'
import EditIcon from '../../assets/images/edit.svg'
import PagesIcon from '../../assets/images/pages.svg'
import AddPage from './AddPage'
import EditPage from './EditPage'
import ConfirmWindow from '../confirmWindow/ConfirmWindow'
import TitleWithIcon from '../elements/TitleWithIcon'
import ButtonWithIcon from '../elements/ButtonWithIcon'
import Loader from '../elements/Loader'
import { CSSTransition,TransitionGroup } from 'react-transition-group'
import FontAwesome from 'react-fontawesome'

class Pages extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pages: [],
      showConfirm: false,
      addPageMode: false,
      editPageMode: false,
      holdCatId: null,
      pageToEdit: null,
      nextPageId: null,
      loading: true
    }
  }

  // Control Delet Page 
  handleDeleterequest = (e) => {
    const { name } = e.target
    this.setState({
      showConfirm: true,
        holdCatId: name
    })
  }

  handleDeleteItem = () => {
    const { holdCatId } = this.state
    firebase.database().ref('Pages').child(holdCatId).remove()
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

  // Control Add Page 
  addPageMode = () => {
    this.setState({
      addPageMode: true,
      editPageMode: false
    })
  }

  // control Edit Page 
  editPageMode = (e) => {
    const { name } = e.target
    this.setState({
      editPageMode: true,
      pageToEdit: name,
      addPageMode: false
    })
  }

  exitEditMode = () => {
    this.setState({
      addPageMode: false,
      editPageMode: false
    })
  }

  componentDidMount () {
    const adminAppdatabase = firebase.database()
    const pagesData = adminAppdatabase.ref('Pages').orderByChild('timestamp')
    pagesData.on('value', (snap) => {
      var pages = []
      snap.forEach((cat) => {
        pages.push({
          key: cat.key,
          ...cat.val()
        })
      })
      const lastPage = pages.slice(pages.length - 1)
      const lastPageId = lastPage[0].pageId
      console.log('last page id', lastPageId)
      this.setState({
        pages: pages.reverse(),
        loading: false,
        nextPageId: (lastPageId + 1)
      })
    })
  }

  render () {
    const { pages, showConfirm, addPageMode, editPageMode, pageToEdit, nextPageId } = this.state
    return (
      <div className='admin-pages'>

        <TitleWithIcon title='إدارة الصفحات' icon='newspaper' />لديك <Badge>{nextPageId} صفحة</Badge>

        <TransitionGroup className="todo-list">
          {
            (addPageMode || editPageMode) ?
            <CSSTransition key={1} classNames="fade" timeout={500}>
              <ButtonWithIcon
                onClick={ this.exitEditMode }
                text='إلفاء'
                iconName='ban'
                ButtonStyle='danger'
                float='left'
              />
            </CSSTransition>
            : (!addPageMode && !editPageMode) ?
            <CSSTransition key={2} classNames="fade" timeout={500}>
              <ButtonWithIcon
                onClick={this.addPageMode}
                text='إضافة صفحة'
                iconName='magic'
                ButtonStyle='success'
                float='left'
              />
            </CSSTransition> : ''
          }
         </TransitionGroup>
         
        {this.state.loading && <Loader iconSize='2x'/>}

        { (!addPageMode && !editPageMode) && <TransitionGroup className="todo-list">
          { pages.map((item, i) =>
            <CSSTransition key={i} timeout={i*1000} classNames="fade" >
              <ListGroup>
                <ListGroupItem header={item.name - i} >
                {item.id}
                <img className='list-user-icon' src={DeleteIcon} alt='delete' name={item.key} onClick={(e)=> this.handleDeleterequest(e)} />
                <img className='list-user-icon' src={EditIcon} alt='edit' name={item.key} onClick={this.editPageMode}/>
                <img className='list-user-icon' src={PagesIcon} alt='Pages' />
                <FontAwesome name='file-alt' style={{color: 'lightgray',fontSize: '18px', marginLeft: '7px'}}/> {item.name} </ListGroupItem>
              </ListGroup>
            </CSSTransition>
            )}
          </TransitionGroup>
        }

        <ConfirmWindow confirmation
          show={showConfirm}
          onConfirm={this.handleDeleteItem}
          onDismiss={this.dismissConfirmation}
          title='حذف صفحة '
          text='حذف صفحة .. لايمكنك الإستعادة بعد الحذف'
        />

        <TransitionGroup className="todo-list">
          {
            (addPageMode && !editPageMode) && 
            <CSSTransition key={1} timeout={500} classNames="fade" >
              <AddPage pageId={nextPageId} onFormSent={this.exitEditMode} />
            </CSSTransition>
          }
          {
            (!addPageMode && editPageMode) &&  
            <CSSTransition key={2} timeout={500} classNames="fade">
              <EditPage pagekey={pageToEdit} onFormSent={this.exitEditMode} />
            </CSSTransition>
          }
        </TransitionGroup>

      </div>
    )
  }
}

export default Pages
