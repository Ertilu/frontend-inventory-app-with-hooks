/*!

=========================================================
* Paper Dashboard React - v1.1.0
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
import ProductItem from "./productItem";
import axios from 'axios';
import { GlobalContext } from '../context/GlobalState';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Dashboard = props => {
  const context = useContext(GlobalContext)

	const token = localStorage.getItem('token');
	const username = localStorage.getItem('username');
	const email = localStorage.getItem('email');
	const user = {
		token, username, email
  }
  
  const [deleted, setDeleted] = useState(false);
	const [queryState, setQueryState] = useState({
		type: 'desc',
		page: 1
	});
	
	const deleteItem = async (id) => {
		await context.productActions.deleteProduct(id, user);
		setDeleted(!deleted);
  }
  
  const deleteConfirm = (id) =>  {
    confirmAlert({
      title: 'Confirmation',
      message: `Are you sure want to delete this product ${this.props.name} ?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteItem(id)
        },
        {
          label: 'No',
          onClick: () => {} 
        }
      ]
    })
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
    <>
      <div className="content">
        <Row>
          <Col lg="12" md="12" sm="12">
            <div className="Product justify-content-end text-center">
            <h1>List Products</h1>
            {
              ( context.isLoaded ) ?
              context.product.products.map( item => {
                return <ProductItem item={item} key={item.id} deleteItem={deleteItem} addOrReduce={addOrReduceQty}/>
              }) : <img className="img-fluid img-size mx-auto" src="https://avanauptown.com/views/site/images/icons/loading.gif" />
            }
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
