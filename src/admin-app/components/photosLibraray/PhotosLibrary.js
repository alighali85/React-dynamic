import React, { Component } from 'react'
import TitleWithIcon from '../elements/TitleWithIcon'
import {Image} from 'react-bootstrap'
import './photos-library.scss'
import AddPhoto from './addPhoto'
import ButtonWithIcon from '../elements/ButtonWithIcon'
import Loader from '../elements/Loader'
import { CSSTransition,TransitionGroup } from 'react-transition-group'
import ConfirmWindow from '../confirmWindow/ConfirmWindow'
import firebase from 'firebase/app'


class PhotosLibrary extends Component {
constructor(props) { 
  super(props)
  this.state = {
    showPopUpWindow: false,
    addPhotoMode: false,
    photosList: [],
    loading: false,
    showDeleteConfirm: false,
    photoIdToDelete: null
  }
}

onDismiss = () => {
  this.setState({
    showPopUpWindow: false,
    addPhotoMode: false,
    loading: false
  })
}

addNewPhotoWindow = () => {
  this.setState({
    showPopUpWindow: true,
    addPhotoMode: true
  })
}

previewPhoto = (id) => {
console.log('preview photo')
}

handleDeleteItemRequest (id) {
  this.setState({
    showDeleteConfirm: true,
    photoIdToDelete: id
  })
}

deletePhoto = () => {
  const { photoIdToDelete } = this.state
  firebase.database().ref('photosLibrary').child(photoIdToDelete).remove()
  this.setState({
    showDeleteConfirm: false,
    photoIdToDelete: null
  })
}

dismissConfirmation = () => {
  this.setState({
    showDeleteConfirm: false,
    photoIdToDelete: null
  })
}

componentDidMount = () => {
  this.getPhohtsFromServer()
}

getPhohtsFromServer = () => {
  const photosLibraryRef = firebase.database().ref().child('photosLibrary')
  photosLibraryRef.on('value', (snap) => {
    var photos = []
    snap.forEach((photo) => {
      photos.push({
        key: photo.key,
        ...photo.val()
      })
    })
    this.setState({
      photosList: photos,
      loading: false,
    })
    console.log(photos.length)
    })
  }

  render () {
    const { showPopUpWindow, loading, addPhotoMode, photosList, showDeleteConfirm } = this.state
    photosList.map(photo => <Image src={photo} thumbnail />)
    return (
      <div className='photos-library'>
      <TitleWithIcon title='إدارة الصفحات' icon='image' />you have in general {photosList.length}

      <TransitionGroup className="todo-list">
        {
          (showPopUpWindow) ?
          <CSSTransition key={1} classNames="fade">
            <h5>add photo mode</h5>
          </CSSTransition>
          : (!showPopUpWindow) ?
          <CSSTransition key={2} classNames="fade">
            <ButtonWithIcon
              onClick={this.addNewPhotoWindow}
              text='إضافة صورة'
              iconName='magic'
              ButtonStyle='success'
              float='left'
            />
          </CSSTransition> : ''
        }
       </TransitionGroup>
       
      {loading && <Loader iconSize='2x'/>}
        <div className='photos-wrapper'>
        <TransitionGroup className="todo-list">
     
      {photosList.map((photo, i) =>  <CSSTransition key={i} classNames="fade">
      <div className="photo-thumpnail" style={{backgroundImage: `url(${photo.imageUrl})`}}>
        <div className="overlay">
          <ButtonWithIcon
          onClick={this.previewPhoto}
          text='مشاهدة صورة'
          iconName='magic'
          ButtonStyle='info'
          float='left'
          />
          <ButtonWithIcon
            onClick={() => this.handleDeleteItemRequest(photo.key)}
            text='إزالة صورة'
            iconName='trash'
            ButtonStyle='danger'
            float='left'
          />
        </div>
      </div>
     </CSSTransition>
    )}
       </TransitionGroup>

        </div>
        <ConfirmWindow
          show={addPhotoMode}
          onDismiss={this.onDismiss}
          title='إضافة صورة '
          >
          <AddPhoto />
        </ConfirmWindow>

        <ConfirmWindow confirmation
          show={showDeleteConfirm}
          onConfirm={this.deletePhoto}
          onDismiss={this.dismissConfirmation}
          title='حذف صورة '
          text='حذف صورة .. لايمكنك الإستعادة بعد الحذف'
        />
      </div>
    )
  }
}

export default PhotosLibrary
