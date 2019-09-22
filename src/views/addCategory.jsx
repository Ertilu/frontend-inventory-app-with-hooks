import React, { useState, useEffect, useContext } from 'react';  
import axios from 'axios';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

import { GlobalContext } from '../context/GlobalState';

const AddCategory = props => {
  const context = useContext(GlobalContext)

	const token = localStorage.getItem('token');
	const username = localStorage.getItem('username');
	const email = localStorage.getItem('email');
	const user = {
		token, username, email
	}

	const [idCategory, setidCategory] = useState(0);
	const [category, setCategory] = useState('');

	useEffect(() => {
		context.categoryActions.getCategory();
	}, []) 

	const updateId = e => {
		setidCategory(Number(e.target.value));
	}

	const updateCategory = e => {
		setCategory(e.target.value);
	}

	const handlerSubmit = () => {
		if (!idCategory || !category) {
			alert('All fields required')
		} else {
			const newData = {
        idCategory,
        category 
			}
      context.categoryActions.createCategory(newData, user)
      document.location.href = 'category.jsx';
		}
  }
  
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Add Product</CardTitle>
              </CardHeader>
              <CardBody>
                  <form onSubmit={handlerSubmit}>
                  <FormGroup>
                    <Label for="id">Category ID</Label>
                    <Input type="number" name="idCategory" id="id" autoComplete="off" placeholder="Enter category ID" onChange={updateId} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Category name</Label>
                    <Input type="text" name="category" id="name" autoComplete="off" placeholder="Enter category name" onChange={updateCategory} />
                  </FormGroup>
                  <tr>
                      <input type="submit" value="Add data" className="btn btn-success" />
                  </tr>
                  </form>
                
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AddCategory;