import React from 'react';
import '../../App.css';

const CategoryTable = (props) => {
	// console.log(props.categories.values.length)
	// var number = 0;

	// for (var i = 0; props.categories.values.length > i ; i++) {
	//     number++;	}
	return(
	<table className="table">
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{props.categories.values && props.categories.values.length > 0 ? (
				props.categories.values.map((category) => (
					<tr key={category.id}>
						<td>{category.id}</td>
						<td>{category.name}</td>
						<td className="center-align">
							<button
								className="btn btn-primary"
								style={{marginRight: '10px'}}
								onClick={() => props.editRow(category)}
							>
								edit
							</button>

							<button
								className="btn btn-danger"
								onClick={() => props.deleteCategory(category.id)}
							>
								delete
							</button>
						</td>
					</tr>
				))
			) : (
				<tr>
					<td style={{ textAlign: 'center', paddingLeft: '40px' }} colSpan={3}>
						{props.categories.values.id}Categories is Empty
					</td>
				</tr>
			)}
		</tbody>
	</table>
	)
};

export default CategoryTable;
