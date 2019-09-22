import axios from 'axios';
import { dispatcher } from '../GlobalState';

export const getProducts = async (query) => {
	dispatcher.setIsLoaded(false)
	const { search, sortBy, sort, limit, page } = query;
    axios.get(`/api/products?sortBy=${sortBy}&sort=${sort}&page=${page}&limit=${limit}&search=${search}`)
      .then(res => {
        dispatcher.dispatchProduct({
          type: 'GET_PRODUCTS',
          payload: res.data
        });
      })
      .then(() => dispatcher.setIsLoaded(true))
}

export const getProduct = id => {
	dispatcher.setIsLoaded(false)
	axios.get('/api/products/' + id)
		.then(res => {
			dispatcher.dispatchProduct({
				type: 'GET_PRODUCT',
				payload: res.data
			})
		})
		.then(() => dispatcher.setIsLoaded(true))
	
}

export const createProduct = (data, user) => {
	dispatcher.setIsLoaded(false)
	dispatcher.dispatchProduct({
		type: 'CREATE_PRODUCT',
		payload: axios.post('/api/products', data, {headers: {auth: user.token, username: user.username, email: user.email}})
	})
}

export const updateProduct = (id, data, user) => {
	dispatcher.setIsLoaded(false)
	dispatcher.dispatchProduct({
		type: 'UPDATE_PRODUCT',
		payload: axios.put('/api/products/' + id, data, {headers: {auth: user.token, username: user.username, email: user.email}})
	})
}

export const addOrReduce = (id, action, user) => {
	const act = {action};
	axios.patch('/api/products/' + id, act, {headers: {auth: user.token, username: user.username, email: user.email}})
		.then(res => {
			dispatcher.dispatchProduct({
				type: 'ADD_OR_REDUCE',
				payload: action,
				message: res.data.message
			});
		})
		
}

export const deleteProduct = (id, user) => {
	dispatcher.setIsLoaded(false)
	axios.delete('/api/products/' + id, {headers: {auth: user.token, username: user.username, email: user.email}})
		.then(res => {
			dispatcher.dispatchProduct({
				type: 'DELETE_PRODUCT',
				payload: res.data
			})
		})
		.then(() => dispatcher.setIsLoaded(true))
	
}

export const deleteSingleProduct = (id, user) => {
	dispatcher.setIsLoaded(false)
	axios.delete('/api/products/' + id, {headers: {auth: user.token, username: user.username, email: user.email}})
		.then(res => {
			dispatcher.dispatchProduct({
				type: 'DELETE_SINGLE_PRODUCT',
				payload: res.data
			})
		})
		.then(() => dispatcher.setIsLoaded(true))
	
}
// , {headers: {auth: user.token, username: user.username, email: user.email}}