import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Login from 'views/login';
import Signup from 'views/signup';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";

class App extends Component {
  render() {
    return (
        
       <Router>
         <div className="container-fluid home">
           <ul>
             <li className="navbar">
               <Link to="/login" className="link">Sign in</Link>
             </li>
             <li className="navbar">
               <Link to="/signup" className="link">Sign up</Link>
             </li>
           </ul>
            <hr/>
            <h1 className="title">Welcome to inventory application please login.</h1>
         
          </div>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
       </Router>
       );
     
    
        
    
  }
}

export default App;
