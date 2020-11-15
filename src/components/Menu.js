import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/logo_uns.png';

class Menu extends Component {

  render() {        

    return (
      <Navbar bg="dark" variant="dark" fixed="top">
        <NavLink to="/" component={Navbar.Brand}>
          <img src={logo} width="40" height="40" className="d-inline-block align-top" alt="Logo"/>
        </NavLink>
        <Nav className="mr-auto">          
          <NavLink to="/home" component={Nav.Link} activeClassName='active'>Inicio</NavLink>
          <NavLink to="/data" component={Nav.Link} activeClassName='active'>Datos</NavLink>
          <NavLink to="/dashboard" component={Nav.Link} activeClassName='active'>Tablero</NavLink>                    
        </Nav>          
        <Nav>
          <NavLink to="/about" component={Nav.Link} className="right">Acerca de</NavLink>
        </Nav>
      </Navbar>  
    );
  }
}

export default Menu