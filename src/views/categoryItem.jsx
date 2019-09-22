import React, {Component, useState, useEffect, useContext} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  FormGroup,
  Label,
  Input
} from "reactstrap";
// import Modal from 'react-bootstrap/Modal';
// import ModalTitle from 'react-bootstrap/ModalTitle';
// import ModalDialog from 'react-bootstrap/ModalDialog';
// import ModalBody from 'react-bootstrap/ModalBody';
import { GlobalContext } from '../context/GlobalState';

const CategoryItem = props => {
  const context = useContext(GlobalContext)

  const {idCategory, category} = props.item;

	const token = localStorage.getItem('token');
	const username = localStorage.getItem('username');
	const email = localStorage.getItem('email');
	const user = {
		token, username, email
  }

  const [id, setId] = useState(0);
	const [categoryName, setCategoryName] = useState(category);
  
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing); 
  }

	const updateIdCategory = e => {
		setId(Number(e.target.value));
  }
  
  
  const updateCategory = e => {
		setCategoryName(e.target.value);
	}


	const [quantityItem, setQuantityItem] = useState(0);
	const [defaultImage, setDefaultImage] = useState(null);

	useEffect(() => {
		setDefaultImage(props.item.image)
		setQuantityItem(props.item.quantity)
  }, [])  

  const handlerSubmit = () => {
    const newData = {
      id: idCategory,
      category: categoryName
    }
    context.categoryActions.updateCategory(idCategory, newData, user);
	}

  return ( 
  <div key={idCategory}>
      <p>{idCategory}</p>
      <p>Category name : {category}</p>
      <button onClick={props.deleteItem.bind(this, idCategory)} className="btn btn-danger">delete data</button>
      <Button color="success" className="btn btn-success" onClick={toggle} >Edit data</Button>
      {/* </Link> */}
      {/* <Route path="editProduct/"  component={EditProduct}/> */}
      <hr />

      <div>        
        <Modal isOpen={isShowing} toggle={toggle} className={props.className}>
          <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
          <ModalBody>
          <form onSubmit={handlerSubmit}>
            <FormGroup>
              <Label for="name">Category name</Label>
              <Input type="text" name="category" id="name" autoComplete="off" placeholder="Enter Category name" value={categoryName} onChange={updateCategory} />
            </FormGroup>
            <ModalFooter>
              <Button type="submit" color="primary" onClick={toggle}>Edit data</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </form>
          </ModalBody>
        </Modal>  
      </div> 
    </div> 
  ); 
}

  export default CategoryItem;