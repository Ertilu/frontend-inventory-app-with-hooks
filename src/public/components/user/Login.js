import React, { useState, useEffect, useContext } from 'react';
import {Redirect, Link} from 'react-router-dom';

import './style.css'

import { GlobalContext, dispatcher } from '../../context/GlobalState';

const Login = props => {
	const context = useContext(GlobalContext)

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const updateEmail = e => {
		setEmail(e.target.value);
	}

	const updatePassword = e => {
		setPassword(e.target.value);
	}

	const loging = () => {
		if(!email && !password) {
			context.userActions.loginUser()

		} else {
			const data = {
				email, password
			}

			context.userActions.loginUser(data)
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
			dispatcher.setIsError(false);
			alert(context.user.message)
		}
	}, [context.user, context.isError]) 

		
	const imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8DXcMqpPAqu2Pm_7LxNpbD4it1EyYUGZHjjKNLFXp6o_LJD51"

	const logged = 	localStorage.getItem('logged');

	if (logged) {
		return <Redirect push to='/products' />
	} else {
		return (
			<div className="container-fluid centering bgImg">
				<form className="user-form">
					<div className="img-center">
						<img src={imgSrc} className="img-fluid img-height" alt="Guest Face"/>
						<h3>Login User </h3>
					</div>

				  <div className="form-group">
				    <label>Email address</label>
				    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={updateEmail} autoComplete="off" />
				  </div>
				  <div className="form-group">
				    <label>Password</label>
				    <input type="password" className="form-control" id="Password" placeholder="Password" onChange={updatePassword} name="password" autoComplete="off" />
				  </div>
				  <div className="row">
				  	<div className="col-6"><Link to="/register" style={{color: 'white', textDecoration: 'none'}}><button type="button" className="btn btn-success px-4 py-2 float-left">Register</button></Link></div>
				  	<div className="col-6"><button type="button" className="btn btn-primary px-4 py-2 float-right" onClick={loging}>Login</button></div>
				  </div>
				</form>
			</div>
		)
	}
} 

export default Login;