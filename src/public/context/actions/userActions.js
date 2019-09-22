import axios from 'axios';
import { dispatcher } from '../GlobalState';

export const loginUser = user => {
	axios.post('/api/login', user)
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
	axios.post('/api/register', user)
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