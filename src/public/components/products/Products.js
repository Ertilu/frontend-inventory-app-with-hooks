import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import ProductsItem from './ProductsItem';
import Title from './Title';
import NavigationBar from '../headers/navbar/Navbar';

import { GlobalContext } from '../../context/GlobalState';


import './style.css';

const Products = props => {
	const context = useContext(GlobalContext)

	const token = localStorage.getItem('token');
	const username = localStorage.getItem('username');
	const email = localStorage.getItem('email');
	const user = {
		token, username, email
	}

	const [deleted, setDeleted] = useState(false);
	const [queryState, setQueryState] = useState({
		search: '%%',
		sortBy: 'updated_at',
		sort: 'desc',
		limit: 6,
		page: 1
	});
	
	const deleteItem = async (id) => {
		await context.productActions.deleteProduct(id, user);
		setDeleted(!deleted);
	}

	const queryString = data => {
		setQueryState(data);
	}

	const pageNumber = () => {
		if(queryState.page !== 1) {
			setQueryState(prev => ({...prev, page: 1}))
		}
		var data = [];
		const counter =  Math.ceil(context.product.total / queryState.limit);
		for (let i = 1; i <= counter; i++) {
			data.push(i);
		}
		return data
	}

	const getProducts = query => {
		context.productActions.getProducts(query);
	}

	const addOrReduceQty = (id, action, user) => {
		context.productActions.addOrReduce(id, action, user)
	}

	useEffect(() => {
		getProducts(queryState);
	}, [queryState, deleted]);

	const pageNum = pageNumber();
	const logged = 	localStorage.getItem('logged') || false;

	return (
		<div>
			<NavigationBar />
			<div id="products" className="row justify-content-md-center">
				<Title callBack={queryString} pagination={pageNum}/>
				{
					( context.isLoaded && context.product.products.length > 0 ) ?
				 	context.product.products.map( item => {
				 		return <ProductsItem item={item} key={item.id} deleteItem={deleteItem} addOrReduce={addOrReduceQty}/>
				 	}) : <img className="img-fluid img-size mx-auto" src="https://avanauptown.com/views/site/images/icons/loading.gif" />
				}
			</div>
		</div>
	)
}

export default Products;