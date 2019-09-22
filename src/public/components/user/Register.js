import React, { useState, useEffect, useContext } from 'react';
import {Redirect, Link} from 'react-router-dom';
import './style.css'

import { GlobalContext, dispatcher } from '../../context/GlobalState';

const Register = props => {
	const context = useContext(GlobalContext)
	
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const updateUsername = e => {
		setUsername(e.target.value);
	}

	const updateEmail = e => {
		setEmail(e.target.value);
	}

	const updatePassword = e => {
		setPassword(e.target.value);
	}


	const register = () => {
		if (!username || !email || !password) {
			context.userActions.registerUser();

		} else {
			const data = {
				username, email, password
			}
			context.userActions.registerUser(data);

		}
	}

	useEffect(() => {
		if (context.user.token) {
			localStorage.setItem('logged', true);				
			localStorage.setItem('token', context.user.token);
			localStorage.setItem('username', context.user.username);
			localStorage.setItem('email', context.user.email);
					
			props.history.push('/products')
		}

		if (context.isError) {
			alert(context.user.message)
			dispatcher.setIsError(false);
		}
	}, [context.user, context.isError]) 

	const imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8DXcMqpPAqu2Pm_7LxNpbD4it1EyYUGZHjjKNLFXp6o_LJD51"

	const logged = 	localStorage.getItem('logged');

	if (logged) {
		props.history.push('/products')
	} else {
		return (
			<div className="container-fluid centering bgImg">
				<form className="user-form" autoComplete="off">
					<div className="img-center">
						<img src={imgSrc} className="img-fluid img-height" alt="Guest Face"/>
						<h3>Register User </h3>


					</div>
					<div className="form-group">
				    <label>Username</label>
				    <input type="text" className="form-control" id="Username" placeholder="Enter username" name="username" onChange={updateUsername} autoComplete="off" />
				  </div>
				  <div className="form-group">
				    <label>Email address</label>
				    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={updateEmail} autoComplete="off" />
				  </div>
				  <div className="form-group">
				    <label>Password</label>
				    <input type="text" className="form-control" id="Password" placeholder="Password" onChange={updatePassword} name="password" autoComplete="off" />
				  </div>
				  <div className="row">
				  	<div className="col-6"><Link to="/login" style={{color: 'white', textDecoration: 'none'}}><button type="button" className="btn btn-primary px-4 py-2 float-left">Login</button></Link></div>
				  	<div className="col-6"><button type="button" className="btn btn-success px-4 py-2 float-right" onClick={register}>Register</button></div>
				  </div>
				</form>
			</div>
		)
	}
} 

export default Register;