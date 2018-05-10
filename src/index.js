import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import AdminApp from './admin-app/index.js'
import './app-theme/index.scss'
import { BrowserRouter, Route } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path='/' component={App} />
      <Route exact path='/admin-app' component={AdminApp} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)
