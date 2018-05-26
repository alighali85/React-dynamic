import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import AdminApp from './admin-app/index.js'
import './app-theme/index.scss'
import { BrowserRouter, Route } from 'react-router-dom'
import firebase from 'firebase/app'

const adminAppdatabaseConfig = {
  apiKey: 'AIzaSyC7_ZlYpn-_T1RnCfSfTj_uoVpdm54Chtc',
  authDomain: 'albassera-44a86.firebaseapp.com',
  databaseURL: 'https://albassera-44a86.firebaseio.com',
  projectId: 'albassera-44a86',
  storageBucket: 'albassera-44a86.appspot.com',
  messagingSenderId: '729501309659'
}

firebase.initializeApp(adminAppdatabaseConfig)

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/admin-app' component={AdminApp} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)
