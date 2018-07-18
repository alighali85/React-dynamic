import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap'
import firebase from 'firebase/app'
import { CSSTransition,TransitionGroup } from 'react-transition-group'
import { Alert } from 'react-bootstrap'
import './add-photo.scss'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'


const propTypes = {
  uploadedFile: PropTypes.func
}

const defaultProps = {
  uploadedFile: (url) => {
    console.log('image uploaded!', url)
  }
}




class AddPhoto extends Component {

  constructor(props) { 
    super(props)
    this.state = {
      uploading: false,
      uploadPercantage: null,
      uploadCompleted: false,
      fileUrl: '',
      uploadedNumber: 0
    }
  }
  
updaetProgress = (val) => {
  this.setState({
    uploadPercantage : val
  })
}


// stroe image url to firebase
storeImage = (downloadURL) => {
  console.log('store image to firebase > ' + downloadURL)
  const photosLibraryRf = firebase.database().ref().child('photosLibrary')
  var photoKey = photosLibraryRf.push().key
  photosLibraryRf.child(photoKey).update({
    name: 'file.name',
    imageUrl: downloadURL
    },
    () => {
      const { uploadedNumber } = this.state
      this.setState({
        uploadCompleted: true,
        fileUrl: downloadURL,
        uploadPercantage: null,
        uploadedNumber: uploadedNumber + 1
        })
      console.log('call back function after put data on firebase')
      this.props.uploadedFile(downloadURL)

    })
}

handleFileupload = (e) => {
  const updaetProgress = this.updaetProgress
  const storeImage = this.storeImage

  // get the file
  const file = e.target.files[0]

  // fire base storag 
  const storage = firebase.storage()
 
  // Create a storage reference from our storage service
  var storageRef = storage.ref()

  // firebase push the file
  var imagesRef = storageRef.child('images/' + file.name);
  var task = imagesRef.put(file)

  //updating the progress bar
  task.on('state_changed',
    function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      percentage = percentage.toFixed(2)
      updaetProgress(percentage)
    },
    function error(err) {
      console.log(err)
    },
    function complete () {
      task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        storeImage(downloadURL)
      });
    })
  }

  render () {
    const { uploadCompleted, uploadPercantage, fileUrl, uploadedNumber } = this.state
    const now = uploadPercantage
    const imageStyle = {
      display: fileUrl ? 'block' : 'none',
      backgroundImage: `url(${fileUrl})`,
      width: '100%',
      height: '400px',
      backgroundSize: 'cover'
    }
    const Image = <div className='uploaded-photo' style={imageStyle}></div>
    return (
      <div className='add-photo'>
        <ProgressBar id='fileUploadProgress' now={now} label={`${now}%`} striped active/>
         {Image}
         <label className='upload-file-wrapper'>
         <FontAwesome name='upload' size='2x'/>
         <p className='upload-file-text'>إختر صورة للتحميل</p>
          <input onChange={this.handleFileupload} type='file' id='fileUploadButton' />
         </label>
        <TransitionGroup className="todo-list">
          { uploadCompleted  && 
            <CSSTransition key={1} classNames="fade" timeout={500}>
              <Alert bsStyle="success"><strong>تم تحميل {uploadedNumber} صورة بنجاح</strong></Alert>
            </CSSTransition>
          }
          { 
            uploadPercantage !== null  && 
            <CSSTransition key={2} classNames="fade" timeout={500}>
              <Alert bsStyle="warning"> <strong>قيد المعالجه .. </strong> </Alert>
            </CSSTransition>
          }
         </TransitionGroup>
      </div>
    )
  }
}

AddPhoto.PropTypes = propTypes
AddPhoto.defaultProps = defaultProps

export default AddPhoto
