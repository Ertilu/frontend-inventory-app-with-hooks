import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import NavigationBar from '../headers/navbar/Navbar';

import { GlobalContext } from '../../context/GlobalState';

const SingleProducts = props => {
	const context = useContext(GlobalContext)

	const [defaultImage, setDefaultImage] = useState('');
	const {id} = props.match.params;

	const token = localStorage.getItem('token');
	const username = localStorage.getItem('username');
	const email = localStorage.getItem('email');
	const user = {
		token, username, email
	}

	useEffect(() => {
		context.productActions.getProduct(id)
	}, []);

	useEffect(() => {
		if (context.isLoaded && context.product.products) {
			setDefaultImage(context.product.products.image)
		}
	}, [context.isLoaded, context.product])
		
	const deleteItem = async (id) => {
		await context.productActions.deleteSingleProduct(id, user)
		return (<div><Redirect push to="/products" /></div>)
	}

	const logged = 	localStorage.getItem('logged') || false;


	if (!logged) {
		return (<div><Redirect to="/login" /></div>)
	} else {
		return (
			<div>
				<NavigationBar />
				<div className="container-fluid">
					<div id="singleProducts" className="p-4">
						
				{
					context.isLoaded && context.product.products ?

					( 
						<div className="row">
							<div className="col-4 border-right"><img src={defaultImage} className="img-fluid img-h" onError={() => setDefaultImage('https://images.vexels.com/media/users/3/127491/isolated/preview/8cb9767b47a1f58908a132a8df10b748-computer-set-flat-icon-by-vexels.png')} alt="Something that you would like to buy :)"/></div>
								<div className="col-7 m-auto">
									<h3 className="border-bottom pb-3">{context.product.products.name}</h3>
									<p>Category: {context.product.products.category}</p>
									<p> Quantity: {context.product.products.quantity}</p>
									<p>Description: <br/>{context.product.products.description}</p>
									<Link to={'/products/edit/' + id } style={{color: 'white'}}>  
										<button type="button" className="btn btn-primary mr-2">Edit</button>
									</Link>
									<Link to={'/products'} style={{color: 'white'}}>
										<button type="button" onClick={deleteItem.bind(this, id)} className="btn btn-danger"> Delete </button>
									</Link>
								</div>
							</div>
					) : <img className="img-fluid img-size mx-auto" src="https://avanauptown.com/views/site/images/icons/loading.gif" />
				}
						
					</div>	
				</div>
			</div>
		)
	}
}	 

export default SingleProducts;