import axios from 'axios';
import { dispatcher } from '../GlobalState';

export const getCategories = () => {
	axios.get('/api/categories')
		.then(res => {
			dispatcher.dispatchCategory({
				type: 'GET_CATEGORIES',
				payload: res.data
			})
		})
		.then(() => dispatcher.setIsLoaded(true))
}

export const createCategory = (data, user) => {
	dispatcher.setIsLoaded(false)
	dispatcher.dispatchCategory({
		type: 'CREATE_CATEGORY',
		payload: axios.post('/category', data, {headers: {token: user.token}})
	})
}

export const updateCategory = (id, data, user) => {
	dispatcher.setIsLoaded(false)
	dispatcher.dispatchCategory({
		type: 'UPDATE_CATEGORY',
		payload: axios.put('/category' + id, data, {headers: {auth: user.token, username: user.username, email: user.email}})
	})
}

export const deleteCategory = (id, user) => {
	dispatcher.setIsLoaded(false)
	axios.delete('/api/products/' + id, {headers: {auth: user.token}})
		.then(res => {
			dispatcher.dispatchCategory({
				type: 'DELETE_PRODUCT',
				payload: res.data
			})
		})
		.then(() => dispatcher.setIsLoaded(true))	
}