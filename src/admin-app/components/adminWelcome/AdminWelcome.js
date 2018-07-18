import React, { Component } from 'react'
import './admin-welcome.scss'
import ButtonWithIcon from '../elements/ButtonWithIcon'
import { Link } from 'react-router-dom'

const HomePanel = ({image = '', title = '', link = '', count = '', description = ''}) => <div className='admin-app-panel'>
  <div className='admin-app-panel__panel'>
    <div className='admin-app-panel__sideImage' />
    <div className='admin-app-panel__body'>
      <h2 className='admin-app-panel__title'>{title}</h2>
      <h2 className='admin-app-panel__discription'>{description}</h2>
      <Link to={link}>
        <ButtonWithIcon
          text={title}
          iconName='magic'
          ButtonStyle='success'
        /></Link>
    </div>
  </div>

</div>

class AdminWelcome extends Component {
  render () {
    return (
      <div className='admin-welcome'>
        <div>
          <HomePanel title='ادارة الاقسام' link='/admin-app/categories' />
          <HomePanel title='ادارة الصفحات' link='/admin-app/pages' />
        </div>
        <div>
          <HomePanel title='ادارة الصور' link='/admin-app/pictuers' />
          <HomePanel title='ادارة الفديو' link='/admin-app/videos' />
        </div>
      </div>
    )
  }
}

export default AdminWelcome
