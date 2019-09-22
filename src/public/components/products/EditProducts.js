import React, { useState, useEffect, useContext } from 'react';
import {Redirect, Link} from 'react-router-dom';
import NavigationBar from '../headers/navbar/Navbar';

import { GlobalContext, dispatcher } from '../../context/GlobalState';

const EditProducts = props => {
	const context = useContext(GlobalContext)

	const {id} = props.match.params;

	const token = localStorage.getItem('token');
	const username = localStorage.getItem('username');
	const email = localStorage.getItem('email');
	const user = {
		token, username, email
	}

	const [name, setName] = useState('');
	const [image, setImage] = useState('');
	const [idCategory, setIdCategory] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [description, setDescription] = useState('');

	useEffect(() => {
		context.categoryActions.getCategories();
		context.productActions.getProduct(id);
	}, []) 

	useEffect(() => {
		if(context.isLoaded && context.product.products){
			setName(context.product.products.name)
			setImage(context.product.products.image)
			setIdCategory(context.product.products.id_category)
			setQuantity(context.product.products.quantity)
			setDescription(context.product.products.description)
		}
	}, [context.isLoaded, context.product])

	const updateName = e => {
		setName(e.target.value);
	}

	const updateImage = e => {
		setImage(e.target.value);
	}

	const updateIdCategory = e => {
		setIdCategory(Number(e.target.value));
	}

	const updateQuantity = e => {
		setQuantity(Number(e.target.value));
	}

	const updateDescription = e => {
		setDescription(e.target.value);
	}


	const editSubmit = () => {
		if (!name || !image || !idCategory || !quantity || !description) {
			alert('All fields required')
		} else {
			const newData = {
				name, image, id_category: idCategory, quantity, description
			}
			context.productActions.updateProduct(id, newData, user);
			props.history.replace('/products/' + id)
		}
	}

	
	const logged = 	localStorage.getItem('logged');

	if (!logged) {
		return (<Redirect to="/login" />)
	} else {
		return (
			<div>
			<NavigationBar />
			<div className="container-fluid">
				<div className="user-form my-5">
					<h3>Edit Products</h3><hr/>
					{
						(context.isLoaded && context.product.products) ?
						(
							<form>
							  <div className="form-group">
							    <label>Product Name</label>
							    <input type="text" className="form-control" value={name} name="name" id="Name" placeholder="Product Name" onChange={updateName} />
							  </div>
							  <div className="form-group">
							    <label>Image (URL)</label>
							    <input type="text" className="form-control" value={image} name="image" id="Image" placeholder="Image (URL)" onChange={updateImage} />
							  </div>
							  <div className="form-group">
							    <label>Select Category</label>
							    <select className="form-control" id="Category" name="id_category" onChange={updateIdCategory}>
							      {
							      	(context.isLoaded && context.category.categories) ?
											context.category.categories.map(category => {
												if (category.id === idCategory) {
													return <option value={category.id} key={category.id} selected>{category.name}</option>
												} else {
													return <option value={category.id} key={category.id}>{category.name}</option>
												}
											}) : ''
										}
							    </select>
							  </div>
							  <div className="form-group">
							    <label>Quantity</label>
							    <input type="number" className="form-control" value={quantity} name="quantity" id="Quantity" placeholder="Quantity" onChange={updateQuantity} />
							  </div>
							  <div className="form-group">
							    <label>Description</label>
							    <textarea className="form-control" value={description} name="description" id="Description" rows="5" onChange={updateDescription}></textarea>
							  </div>
							  <div className="form-group">
							  	<button type="button" onClick={editSubmit} className="btn btn-primary form-control py-2"><b>Edit</b></button>
							  </div>
							</form>
						) : ''
					}
				</div>
			</div>
			</div>
		)
	}
}

export default EditProducts;