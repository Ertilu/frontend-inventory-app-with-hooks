import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import {Link} from 'react-router-dom';

import { GlobalContext, dispatcher } from '../../../context/GlobalState';

const NavigationBar = props => {
	const context = useContext(GlobalContext)

	const user = localStorage.getItem('username');
	
	const logout = async () => {
		await localStorage.clear();
		await context.userActions.logOut();
		window.location.replace('/login')
	}
	
	return (			
		<nav id="navbar" className="navbar">
		<div className="row w-100">
    		<div className="col-6"><Link to="/" className="navbar-brand ml-2" style={{color: 'white'}}><h2>Computer Inventory App</h2></Link></div>
    		<div className="col-6 pt-3">
    			<h4 className="float-right">Selamat Datang {user}, <button type="button" id="btnLogout" onClick={logout}>Logout</button></h4>
	    	</div>
    	</div>
	  	</nav>
	)
}


export default NavigationBar;