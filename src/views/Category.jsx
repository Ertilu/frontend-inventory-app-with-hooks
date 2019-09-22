/*!

=========================================================
* Paper Category React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState, useEffect, useContext} from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.jsx";
import CategoryItem from "./categoryItem";
import axios from 'axios';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { GlobalContext } from '../context/GlobalState';

const Category = props => {
  const context = useContext(GlobalContext)

	const token = localStorage.getItem('token');
	const username = localStorage.getItem('username');
	const email = localStorage.getItem('email');
	const user = {
		token, username, email
	}

	const [deleted, setDeleted] = useState(false);
	const [queryState, setQueryState] = useState('');
	
	const deleteItem = async (id) => {
		await context.categoryActions.deleteCategory(id, user);
		setDeleted(!deleted);
	}

	const queryString = data => {
		setQueryState(data);
	}

	const getCategory = query => {
		context.categoryActions.getCategory(query);
	}

	useEffect(() => {
		getCategory();
	}, [queryState, deleted]);
  
  return (
   <>
      <div className="content">
        <Row>
          <Col lg="12" md="12" sm="12">
            <div className="Product justify-content-end text-center">
            <h1>List Category</h1>
            {
              ( context.isLoaded  ) ?
              context.category.categories.map( item => {
                return <CategoryItem item={item} key={item.idCategory} deleteItem={deleteItem}  />
              }) : <img className="img-fluid img-size mx-auto" src="https://avanauptown.com/views/site/images/icons/loading.gif" />
            }
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Category;
