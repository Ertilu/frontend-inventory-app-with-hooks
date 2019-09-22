import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import React from 'react';
import axios from 'axios';

import { GlobalState } from './context/GlobalState';

import Products from './components/products/Products';
import SingleProducts from './components/products/SingleProducts';
import EditProducts from './components/products/EditProducts';
import CreateProducts from './components/products/CreateProducts';

import Login from './components/user/Login';
import Register from './components/user/Register';

import './App.css';

const App = () => {
  axios.defaults.baseURL = 'http://192.168.1.17:7000';

  return (
    <GlobalState>
      <Router>
        <div id="main" className="container-fluid" style={{padding: '0', margin: '0'}}>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/" exact component={function() {return <Redirect push to="/login" />}} />
            <Route path="/products" exact component={Products} />
            <Route path="/products/create" exact component={CreateProducts} />
            <Route path="/products/:id" exact component={SingleProducts} />
            <Route path="/products/edit/:id" exact component={EditProducts} />
          </Switch>
        </div>
      </Router>
    </GlobalState>
  )
}

export default App;
