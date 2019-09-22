import axios from 'axios';
import { dispatcher } from '../GlobalState';
import { API } from "../api";

export const loginUser = user => {
	axios.post(API+'/user/login', user)
		.then(res => {
			if (res.data.status === 200) {
				dispatcher.dispatchUser({
					type: 'LOGIN_USER',
					payload: res.data
				})
			} else {
				dispatcher.dispatchUser({
					type: 'FAIL',
					message: res.data.message
				});
				dispatcher.setIsError(true);
			}
			
		})
}

export const registerUser = (user = {}) => {
	axios.post(API+'/user/register', user)
		.then(res => {
			if (res.data.status === 200) {
				dispatcher.dispatchUser({
					type: 'REGISTER_USER',
					payload: res.data
				})
			} else {
				dispatcher.dispatchUser({
					type: 'FAIL',
					message: res.data.message
				});
				dispatcher.setIsError(true);
			}
		})
}

export const logOut = () => {
	return	dispatcher.dispatchUser({
		type: 'LOG_OUT',
	})
}