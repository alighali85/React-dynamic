import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './app-theme/index.scss'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import firebase from 'firebase/app'
import ReactBreakpoints from 'react-breakpoints'

const adminAppdatabaseConfig = {
  apiKey: 'AIzaSyC7_ZlYpn-_T1RnCfSfTj_uoVpdm54Chtc',
  authDomain: 'albassera-44a86.firebaseapp.com',
  databaseURL: 'https://albassera-44a86.firebaseio.com',
  projectId: 'albassera-44a86',
  storageBucket: 'albassera-44a86.appspot.com',
  messagingSenderId: '729501309659'
}

firebase.initializeApp(adminAppdatabaseConfig)

const breakpoints = {
  mobile: 320,
  mobileLandscape: 480,
  tablet: 768,
  tabletLandscape: 1024,
  desktop: 1200,
  desktopLarge: 1500,
  desktopWide: 1920
}

ReactDOM.render(
  <BrowserRouter>
    <ReactBreakpoints breakpoints={breakpoints}>
      <App/>
    </ReactBreakpoints>
  </BrowserRouter>,
  document.getElementById('root')
)
