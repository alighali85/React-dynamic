import React, { Component } from 'react'
import TitleWithIcon from '../elements/TitleWithIcon'
import {Image, Badge} from 'react-bootstrap'
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
    photoIdToDelete: null,
    showPhotoPreview : false,
    previewPhotoId: null,
  }
}

componentDidMount = () => {
  this.getPhohtsFromServer()
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

openPreviewPhoto = (id) => {
console.log('preview photo')
this.setState({
  showPhotoPreview: true,
  previewPhotoId: id
})
}

exitPreviewMode = () => {
  this.setState({
    showPhotoPreview: false,
    previewPhotoId: null
  })
}

copyImageUrlToclipboard(url) {
   
    document.execCommand("copy", url);
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

getPhohtsFromServer = () => {
  const photosLibraryRef = firebase.database().ref('photosLibrary').orderByChild('timestamp')
  photosLibraryRef.on('value', (snap) => {
    var photos = []
    snap.forEach((photo) => {
      photos.push({
        key: photo.key,
        ...photo.val()
      })
    })
    this.setState({
      photosList: photos.reverse(),
      loading: false,
    })
    })
  }

  render () {
    const { showPopUpWindow, loading, addPhotoMode, photosList, showDeleteConfirm, showPhotoPreview,
      previewPhotoId
    } = this.state
    photosList.map(photo => <Image src={photo} thumbnail />)
    return (
      <div className='photos-library'>
      <TitleWithIcon title='مكتبة الصور' icon='image' />
      لديك <Badge>{photosList.length} صورة</Badge>

      <TransitionGroup className="todo-list">
        {
          (showPopUpWindow) ?
          <CSSTransition key={1} classNames="fade" timeout={500} >
          <div/>
          </CSSTransition>
          : (!showPopUpWindow) ?
          <CSSTransition key={2} classNames="fade" timeout={500}  >
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
            {photosList.map((photo, i) =>  <CSSTransition key={i} classNames="fade" timeout={500}>
              <div className="photo-thumpnail" style={{backgroundImage: `url(${photo.imageUrl})`}}>
                <div className="overlay">
                  <ButtonWithIcon
                  onClick={() => this.openPreviewPhoto(photo.imageUrl)}
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
        <ConfirmWindow confirmation
          size='large'
          show={showPhotoPreview}
          onConfirm={()=> {this.copyImageUrlToclipboard(previewPhotoId)}}
          onDismiss={this.exitPreviewMode}
          title='معاينة صورة '
        >
        <img src={previewPhotoId} alt='preview' style={{width: '100%', height: '100%'}}/>
        </ConfirmWindow>
      </div>
    )
  }
}

export default PhotosLibrary
