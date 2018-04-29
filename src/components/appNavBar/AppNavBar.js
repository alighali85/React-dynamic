import React from 'react';
import { Grid , NavItem, NavDropdown, Nav, MenuItem, Navbar } from 'react-bootstrap';
import AppLogo from '../../assest/img/app-logo.svg';
import { APP_NAME_ARABIC } from '../../assest/constants/AppMainContent.js';

const NavBar = () => <Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <div className="app-logo-container">
        <img src={AppLogo} />
        <h2>{APP_NAME_ARABIC}</h2>
      </div>
    </Navbar.Brand>
  </Navbar.Header>
</Navbar>;

export default NavBar;