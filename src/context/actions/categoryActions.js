import axios from 'axios';
import { dispatcher } from '../GlobalState';

import { API } from "../api";

export const getCategory = () => {
	axios.get(`${API}/category`)
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
		payload: axios.post(API+'/category', data, {headers: {token: user.token}})
	})
}

export const updateCategory = (id, data, user) => {
	dispatcher.setIsLoaded(false)
	dispatcher.dispatchCategory({
		type: 'UPDATE_CATEGORY',
		payload: axios.put(API+'/category/' + id, data, {headers: {token: user.token}})
	})
}

export const deleteCategory = (id, user) => {
	dispatcher.setIsLoaded(false)
	axios.delete(API+'/category/' + id, {headers: {token: user.token}})
		.then(res => {
			dispatcher.dispatchCategory({
				type: 'DELETE_CATEGORY',
				payload: res.data
			})
		})
		.then(() => dispatcher.setIsLoaded(true))	
}