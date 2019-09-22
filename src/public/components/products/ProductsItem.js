import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { GlobalContext } from '../../context/GlobalState';

const ProductsItem = props => {
	const context = useContext(GlobalContext)

	const token = localStorage.getItem('token');
	const username = localStorage.getItem('username');
	const email = localStorage.getItem('email');
	const user = {
		token, username, email
	}

	const [quantityItem, setQuantityItem] = useState(0);
	const [defaultImage, setDefaultImage] = useState(null);

	const addOrReduce = e => {
		e.preventDefault();
		if (e.target.value === 'add') {
			setQuantityItem(quantityItem+1);
			props.addOrReduce(props.item.id, e.target.value, user);
		} else {
			setQuantityItem(quantityItem-1);
			props.addOrReduce(props.item.id, e.target.value, user);
		}
	}

	useEffect(() => {
		setDefaultImage(props.item.image)
		setQuantityItem(props.item.quantity)
	}, [])  

	const {id, name, category} =  props.item;

	return (
		<div id="productsItem" className="border col-3 mx-4 mt-5 mb-3 p-0">
			<div className="text-center">
				<img src={defaultImage} onError={() => setDefaultImage('https://images.vexels.com/media/users/3/127491/isolated/preview/8cb9767b47a1f58908a132a8df10b748-computer-set-flat-icon-by-vexels.png')} className="img-fluid d-inline-block img-h" alt="Something that you like to buy :)"/>
			</div>
			<div className="p-3">
				<h5><Link to={'/products/' + id } style={{textDecoration: 'none'}}>{name}</Link></h5>
				<p>Category: {category}<br/>
				   Quantity: {quantityItem}</p>
				<form>
					<button onClick={addOrReduce} className="btn btn-primary mr-2" value="add"> Add </button>
					<button onClick={addOrReduce} className="btn btn-warning mr-2" value="reduce"> Reduce </button>
					<button type="button" onClick={props.deleteItem.bind(this, id)} className="btn btn-danger"> Delete </button>
				</form>
			</div>

		</div>
	)
}



export default ProductsItem;
