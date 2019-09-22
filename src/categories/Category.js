import React, { Component } from 'react';
import qs from 'querystring';

import api from '../../axios/Api';

import CategoryTable from './ListCategory';
import AddCategoryForm from './AddCategory';
import EditCategoryForm from './EditCategory';

class Category extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categories: [],
			currentCategory: { id: null, name: '' },
			editing: false
		};
	}

	componentDidMount() {
		this.refreshCategoryTable();
	}

	refreshCategoryTable() {
		this.categoriesData = api.get('categories', this.state).then((response) => response.data).then((data) => {
			this.setState({
				categories: data,
				setCategories: data
			});
			// console.log(this.state.categories.values[0]);
			// console.log(this.props, this.state);
		});
	}

	addCategory = (category) => {
		api.post('categories', qs.stringify(category)).then((res) => {
			this.refreshCategoryTable();
		});
	};

	deleteCategory = (id) => {
		api.delete(`categories/${id}`).then((res) => {
			this.refreshCategoryTable();
		});
	};

	updateCategory = (id, category) => {
		api.patch(`categories/${id}`, qs.stringify(category)).then((res) => {
			this.refreshCategoryTable();
		});

		this.setState({
			currentCategory: { id: null, name: '' }
		});

		this.setEditing(false);
	};

	editRow = (category) => {
		this.setState({
			currentCategory: { id: category.id, name: category.name }
		});

		this.setEditing(true);
	};

	setEditing = (isEditing) => {
		this.setState({ editing: isEditing });
	};

	render() {
		const { categories } = this.state;

		return (
			<div className="container">
				<div className="row">
					{this.state.editing ? (
						<div className="col s12 l6">
						<br />
							<h4>Edit Category</h4>
							<br />
							<EditCategoryForm
								editing={this.state.editing}
								setEditing={this.setEditing}
								currentCategory={this.state.currentCategory}
								updateCategory={this.updateCategory}
							/>
						</div>
					) : (
						<div className="col s12 l6">
							<br />
							<h4>Add Category</h4>
							<br />
							<AddCategoryForm addCategory={this.addCategory} />
						</div>
					)}

					<div className="col s12 l6">
						<br />
						<h5 style={{ justifyContent: 'center' }}>Categories</h5>
						<CategoryTable
							categories={categories}
							editRow={this.editRow}
							deleteCategory={this.deleteCategory}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Category;
