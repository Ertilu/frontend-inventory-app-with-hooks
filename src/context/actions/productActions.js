import axios from 'axios';
import { dispatcher } from '../GlobalState';
import { API } from '../api';

export const getProducts = async (query) => {
	dispatcher.setIsLoaded(false)
	const { search, sortBy, sort, limit, page } = query;
    axios.get(`${API}/products?type=desc`)
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
	axios.get(API+'/products/' + id)
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
		payload: axios.post(API+'/products', data, {headers: {token: user.token}})
	})
}

export const updateProduct = (id, data, user) => {
	dispatcher.setIsLoaded(false)
	dispatcher.dispatchProduct({
		type: 'UPDATE_PRODUCT',
		payload: axios.put(API+'/products/' + id, data, {headers: {auth: user.token}})
	})
}

export const addOrReduce = (id, action, user) => {
	const act = {action};
	axios.put(API+'/products/' + id, act, {headers: {auth: user.token}})
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
	axios.delete(API+'/products/' + id, {headers: {auth: user.token}})
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
	axios.delete(API+'/products/' + id, {headers: {auth: user.token}})
		.then(res => {
			dispatcher.dispatchProduct({
				type: 'DELETE_SINGLE_PRODUCT',
				payload: res.data
			})
		})
		.then(() => dispatcher.setIsLoaded(true))
}