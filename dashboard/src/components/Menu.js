import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/logo_uns.png';

class Menu extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Link to="/" component={Navbar.Brand}>
          <img src={logo} width="40" height="40" className="d-inline-block align-top" alt="Logo"/>
        </Link>
        <Nav className="mr-auto">
          <Link to="/home" component={Nav.Link}>Inicio</Link>
          <Link to="/data" component={Nav.Link}>Datos</Link>
          <Link to="/dashboard" component={Nav.Link}>Tablero</Link>
          <Link to="/about" component={Nav.Link}>Acerca de</Link>
        </Nav>          
      </Navbar>  
    );
  }
}

export default Menu