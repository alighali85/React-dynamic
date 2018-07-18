import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap'
import firebase from 'firebase/app'
import { CSSTransition,TransitionGroup } from 'react-transition-group'
import { Alert, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import './add-video.scss'
import FontAwesome from 'react-fontawesome'


class AddVideo extends Component {

  constructor(props) { 
    super(props)
    this.state = {
      uploading: false,
      uploadPercantage: null,
      uploadCompleted: false,
      fileUrl: '',
      uploadedNumber: 0,
      videoLink: '',
      videoName: 'بدون اسم'
    }
  }
  
updaetProgress = (val) => {
  this.setState({
    uploadPercantage : val
  })
}

handleAddVideoLink = (e) => {
  e.preventDefault()
  this.storeVideo(this.state.videoLink)
}

// stroe image url to firebase
storeVideo = (downloadURL) => {
  const { videoName } = this.state
  const videosLibraryRf = firebase.database().ref().child('videosLibrary')
  var videoKey = videosLibraryRf.push().key
  videosLibraryRf.child(videoKey).update({
    name: videoName,
    imageUrl: downloadURL,
    },
    () => {
      const { uploadedNumber } = this.state
      this.setState({
        uploadCompleted: true,
        fileUrl: downloadURL,
        uploadPercantage: null,
        uploadedNumber: uploadedNumber + 1
        })
    })
}

handleInput = (e) => {
 const { value, name } = e.target
  this.setState({
    [name]: value
  })
}

handleFileupload = (e) => {
  const updaetProgress = this.updaetProgress
  const storeVideo = this.storeVideo

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
        storeVideo(downloadURL)
      });
    })
  }

  render () {
    const {uploadCompleted, uploadPercantage, fileUrl, uploadedNumber, videoLink } = this.state
    const now = uploadPercantage
    const imageStyle = {
      display: fileUrl ? 'block' : 'none',
      backgroundImage: `url(${fileUrl})`,
      width: '100%',
      height: '400px',
      backgroundSize: 'cover'
    }
    const Image = <div classname='uploaded-video' style={imageStyle}></div>
    return (
      <div classname='add-video'>
      <p>اسم الفديو</p>
        <FormControl name='videoName' type='text' placeholder='' onChange={this.handleInput}/>  
        <br/>
        <ProgressBar id='fileUploadProgress' now={now} label={`${now}%`} striped active/>
         {Image}
         <label className='upload-file-wrapper'>
         <FontAwesome name='upload' size='2x'/>
         <p className='upload-file-text'>إختر ملف فديو للتحميل</p>
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


         <form onSubmit={this.handleAddVideoLink}>     
         <FormGroup>
           <ControlLabel>الصق رابط هنا</ControlLabel>
           <FormControl name='videoLink' type='text' placeholder='' onChange={this.handleInput}/>
         </FormGroup>
     
         <Button type="submit">ارسل الرابط</Button>
       </form>
      </div>
    )
  }
}

export default AddVideo
