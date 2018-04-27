import React from 'react';
import { Grid , NavItem, NavDropdown, Nav, MenuItem, Navbar } from 'react-bootstrap';
import AppLogo from '../../assest/img/app-logo.svg';

const NavBar = () => <Navbar>
<Navbar.Header>
  <Navbar.Brand>
    <div className="app-logo-container">
      <img src={AppLogo} />
      <h2>البصيرة</h2>
    </div>
  </Navbar.Brand>
</Navbar.Header>
</Navbar>;

export default NavBar;