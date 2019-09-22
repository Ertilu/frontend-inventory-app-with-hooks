import React, { useState, useEffect, useContext } from 'react';
import {Redirect} from 'react-router-dom';
import NavigationBar from '../headers/navbar/Navbar';

import { GlobalContext } from '../../context/GlobalState';

const CreateProducts = props => {
	const context = useContext(GlobalContext)

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
	}, []) 

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

	const createSubmit = () => {
		if (!name || !image || !idCategory || !quantity || !description) {
			alert('All fields required')
		} else {
			const newData = {
				name, image, id_category: idCategory, quantity, description
			}
			context.productActions.createProduct(newData, user)
			props.history.replace('/products')
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
					<h3>Create Products</h3><hr/>
					<form>
					  <div class="form-group">
					    <label for="Name">Product Name</label>
					    <input type="text" class="form-control" name="name" id="Name" placeholder="Product Name" onChange={updateName} />
					  </div>
					  <div class="form-group">
					    <label for="Image">Image (URL)</label>
					    <input type="text" class="form-control" name="image" id="Image" placeholder="Image (URL)" onChange={updateImage} />
					  </div>
					  <div class="form-group">
					    <label for="Category">Select Category</label>
					    <select class="form-control" id="Category" name="id_category" onChange={updateIdCategory}>
					      {	context.isLoaded && context.category.categories ?
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
					  <div class="form-group">
					    <label for="Qauntity">Quantity</label>
					    <input type="number" class="form-control" name="quantity" id="Quantity" placeholder="Quantity" onChange={updateQuantity} />
					  </div>
					  <div class="form-group">
					    <label for="Description">Description</label>
					    <textarea class="form-control" name="description" id="Description" rows="5" placeholder="Product Description" onChange={updateDescription}></textarea>
					  </div>
					  <div class="form-group">
					  	<button type="button" onClick={createSubmit} className="btn btn-primary form-control py-2"><b>Create</b></button>
					  </div>
					</form>
				</div>
			</div>
			</div>
		)
	}
}

export default CreateProducts;