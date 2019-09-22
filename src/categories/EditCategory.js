import React, { useState, useEffect } from 'react';

const EditCategoryForm = (props) => {
	const [ category, setCategory ] = useState(props.currentCategory);

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setCategory({ ...category, [name]: value });
	};

	const submitForm = (event) => {
		event.preventDefault();

		props.updateCategory(category.id, category);
		console.log(category.id)
	};

	useEffect(
		() => {
			setCategory(props.currentCategory);
		},
		[ props ]
	);

	return (
		<div className="row">
			<form className="col s12" onSubmit={submitForm}>
				<div className="row">
					<div className="col-md-9">
						<input
							type="text"
							id={category.id}
							name="name"
							className="form-control"
							value={category.name}
							onChange={handleInputChange}
							required
						/>
						<label htmlFor="name" />
					</div>
				</div>

				{/* <div className="row">
                    <div className="input-field col s12">

                        <input 
                            type="text" 
                            name="username" 
                            value={user.username}
                            onChange={handleInputChange} 
                            required />
                        <label htmlFor="username"></label>
                    </div>
                </div> */}

				<div className="row">
					<div className="input-field col-sm-2" style={{marginRight: '5px'}}>
						<button className="btn btn-success">Update</button>
					</div>

					<div className="input-field col s12 m6">
						<button className="btn btn-info" onClick={() => props.setEditing(false)}>
							Cancel
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default EditCategoryForm;
