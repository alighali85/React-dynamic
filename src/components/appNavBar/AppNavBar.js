import React, { Component } from 'react';
import { Grid , NavItem, NavDropdown, Nav, MenuItem, Navbar } from 'react-bootstrap';
import AppLogo from '../../assest/img/app-logo.svg';
import './app-navbar.scss';
import { APP_NAME_ARABIC } from '../../assest/constants/AppMainContent.js';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Navbar className="nav-bar-container">
        <Navbar.Header>
          <Navbar.Brand>
            <div className="app-logo-container">
              <img src={AppLogo} />
              <h2>{APP_NAME_ARABIC}</h2>
            </div>
          </Navbar.Brand>
        </Navbar.Header>
        { this.props.children }
      </Navbar>
    )
  }
}

export default NavBar;