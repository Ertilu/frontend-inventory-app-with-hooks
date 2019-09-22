import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { GlobalContext, dispatcher } from '../../context/GlobalState';

const Title = props => {
	const context = useContext(GlobalContext)

	const [search, setSearch] = useState('%%');
	const [sortBy, setSortBy] = useState('updated_at');
	const [sort, setSort] = useState('desc');
	const [limit, setLimit] = useState(6);
	const [page, setPage] = useState(1);

	const updateSearch = e => {
		setSearch(e.target.value);
	}

	const updateSortBy = e => {
		setSortBy(e.target.value);
	}

	const updateSort = e => {
		setSort(e.target.value);
	}

	const updateLimit = e => {
		setLimit(Number(e.target.value));
	}

	const updatePage = e => {
		setPage(Number(e.target.value));
	}

	useEffect(() => {
		const newQuery = {
			search, sortBy, sort, limit, page
		}
		props.callBack(newQuery)
	}, [search, sortBy, sort, limit, page]) 

	return(
		<div id="title" className="col-12">
		<div className="row">
			<div className="col-6"><h3>Computer Products</h3></div>
			<div className="col-6"><form className="form-inline ml-auto float-right">
        <input className="form-control mr-sm-2" type="search" name="search" placeholder="Search" aria-label="Search" onChange={updateSearch} />
      </form></div>
    </div>
			<hr/>
			<div className="row">
				<div className="col-4">
					<ul className="query">
						<li className="query-item mr-4">
							<select defaultValue="Sort By" className="form-control" name="sortBy" onChange={updateSortBy}>
					      <option disabled>Sort By</option>
					      <option value="name">Name</option>
					      <option value="id_category">Category</option>
					      <option value="quantity">Quantity</option>
					      <option value="created_at">Date</option>
					    </select>
					  </li>
					  <li className="query-item mr-4">
						  <select defaultValue="ASC" className="form-control" name="sort" onChange={updateSort}>
					      <option value="asc">ASC</option>
					      <option value="desc">DESC</option>
					    </select>
					  </li>
					  <li className="query-item mr-4">
					  	<select defaultValue="6" className="form-control" name="limit" onChange={updateLimit}>
					      <option value="6">6</option>
					      <option value="9">9</option>
					      <option value="12">12</option>
					      <option value="15">15</option>
					    </select>
					  </li>
					</ul>
				</div>
				<div className="col-4">
					  <select defaultValue={page} className="form-control" name="page" onChange={updatePage}>
					  	<option disabled>Select Page</option>
					{
						props.pagination.map(num => {
							return <option value={num} key={num}>{num}</option>
						})
					}
						</select>
				</div>
				<div className="col-4">
					<Link to="/products/create" style={{color: 'white', textDecoration: 'none'}}><button className="btn btn-success float-right btn-lg">Create Product</button></Link>
				</div>
			</div>

			</div>
	)
}

export default Title;