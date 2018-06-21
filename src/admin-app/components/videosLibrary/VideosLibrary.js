import React, { Component } from 'react'
import TitleWithIcon from '../elements/TitleWithIcon'
import { Badge } from 'react-bootstrap'
import './videos-library.scss'
import AddVideo from './addVideo'
import ButtonWithIcon from '../elements/ButtonWithIcon'
import Loader from '../elements/Loader'
import { CSSTransition,TransitionGroup } from 'react-transition-group'
import ConfirmWindow from '../confirmWindow/ConfirmWindow'
import firebase from 'firebase/app'


class VideosLibrary extends Component {
constructor(props) { 
  super(props)
  this.state = {
    showPopUpWindow: false,
    addVideosMode: false,
    videosList: [],
    loading: false,
    showDeleteConfirm: false,
    videosIdToDelete: null,
    showVideosPreview : false,
    previewVideosId: null,
  }
}

onDismiss = () => {
  this.setState({
    showPopUpWindow: false,
    addVideosMode: false,
    loading: false
  })
}

addNewVideosWindow = () => {
  this.setState({
    showPopUpWindow: true,
    addVideosMode: true
  })
}

openPreviewVideos = (id) => {
console.log('preview Videos')
this.setState({
  showVideosPreview: true,
  previewVideosId: id
})
}

exitPreviewMode = () => {
  this.setState({
    showVideosPreview: false,
    previewVideosId: null
  })
}

copyImageUrlToclipboard(url) {
    document.execCommand("copy", url);
}

handleDeleteItemRequest (id) {
  this.setState({
    showDeleteConfirm: true,
    videosIdToDelete: id
  })
}

deletevideos = () => {
  const { VideosIdToDelete } = this.state
  firebase.database().ref('VideossLibrary').child(VideosIdToDelete).remove()
  this.setState({
    showDeleteConfirm: false,
    videosIdToDelete: null
  })
}

dismissConfirmation = () => {
  this.setState({
    showDeleteConfirm: false,
    videosIdToDelete: null
  })
}

componentDidMount = () => {
  this.getVideosFromServer()
}

getVideosFromServer = () => {
  console.log('get videos from server')
  const videossLibraryRef = firebase.database().ref('videosLibrary').orderByChild('timestamp')
  videossLibraryRef.on('value', (snap) => {
    var videoss = []
    snap.forEach((videos) => {
      videoss.push({
        key: videos.key,
        ...videos.val()
      })
    })
    this.setState({
      videosList: videoss.reverse(),
      loading: false,
    })
    console.log(videoss.length)
    })
  }

  render () {
    const { showPopUpWindow, loading, addVideosMode, 
      videosList, showDeleteConfirm, showVideosPreview,
      previewVideosId } = this.state

    return (
      <div className='videos-library'>
      <TitleWithIcon title='مكتبة الفديو' icon='video' />
      لديك <Badge>{videosList.length} فديو</Badge>

      <TransitionGroup className="todo-list">
        {
          (showPopUpWindow) ?
          <CSSTransition key={1} classNames="fade">
            <div/>
          </CSSTransition>
          : (!showPopUpWindow) ?
          <CSSTransition key={2} classNames="fade">
            <ButtonWithIcon
              onClick={this.addNewVideosWindow}
              text='إضافة فديو'
              iconName='magic'
              ButtonStyle='success'
              float='left'
            />
          </CSSTransition> : ''
        }
       </TransitionGroup>
       
      {loading && <Loader iconSize='2x'/>}
        <div className='videos-library'>
          <TransitionGroup className="todo-list">
            {videosList.map((video, i) =>  <CSSTransition key={i} classNames="fade">
              <div className="vidoe-thumpnail" style={{backgroundImage: `url(${video.imageUrl})`}}>
                <div className="overlay">
                  <ButtonWithIcon
                  onClick={() => this.openPreviewVideos(video.imageUrl)}
                  text='مشاهدة الفديو'
                  iconName='magic'
                  ButtonStyle='info'
                  float='left'
                  />
                  <ButtonWithIcon
                    onClick={() => this.handleDeleteItemRequest(video.key)}
                    text='إزالة فديو'
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
          show={addVideosMode}
          onDismiss={this.onDismiss}
          title='إضافة فديو '
          >
          <AddVideo />
        </ConfirmWindow>

        <ConfirmWindow confirmation
          show={showDeleteConfirm}
          onConfirm={this.deleteVideos}
          onDismiss={this.dismissConfirmation}
          title='حذف فديو '
          text='حذف فديو .. لايمكنك الإستعادة بعد الحذف'
        />
        <ConfirmWindow confirmation
          size='large'
          show={showVideosPreview}
          onConfirm={()=> {this.copyImageUrlToclipboard(previewVideosId)}}
          onDismiss={this.exitPreviewMode}
          title='معاينة فديو '
        >
        <img src={previewVideosId} alt='preview' style={{width: '100%', height: '100%'}}/>
        </ConfirmWindow>
      </div>
    )
  }
}

export default VideosLibrary
