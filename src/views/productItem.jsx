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

const ProductItem = props => {
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
  
  const { pId, pName, pDesc, pQty, onDelete, pImage, category, pDateAdded, pDateUpdated } = props.item;

  return ( 
  <div key={pId}>
      <p>Product Name : {pName}</p>
      <p>Description : {pDesc}</p>
      <div>
      <img src={pImage} alt={pName} style={{width: 500}} />
      </div>
      <p>Category : {category}</p>
      <p>Quantity : {pQty}</p>
      <p>Date Added : {pDateAdded}</p>
      <p>Date Updated : {pDateUpdated}</p>
      <button onClick={props.deleteItem.bind(this, pId)} className="btn btn-danger">delete data</button>
      {/* <Link to={"editProduct/" + id }> */}
      <Button color="success" className="btn btn-success" >Edit data</Button>
      {/* </Link> */}
      {/* <Route path="editProduct/"  component={EditProduct}/> */}
      <hr />


      {/* {/* Modal Box
      <div>        
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>Edit Product</ModalHeader>
          <ModalBody>
          <form onSubmit={this.handlerSubmit}>
            <FormGroup>
              <Label for="name">Product name</Label>
              <Input type="text" name="pName" id="name" autoComplete="off" placeholder="Enter product name" value={pName} onChange={this.handlerChange} />
            </FormGroup>
            <FormGroup>
              <Label for="desc">Description</Label>
              <Input type="text" name="pDesc" id="desc" autoComplete="off" placeholder="Enter description" value={pDesc} onChange={this.handlerChange} />
              </FormGroup>
              <FormGroup>
                <Label for="image">Image</Label>
                <Input type="text" name="pImage" id="image" autoComplete="off" placeholder="Product Image (URL)" value={pImage} onChange={this.handlerChange} />
              </FormGroup>
              <FormGroup>
                <Label for="idCategory">Select Category</Label>
                <Input type="select" name="idCategory" id="idCategory" value={idCategory} >
                  <option value="1">Daily needs</option>
                  <option value="2">Electronic</option>
                  <option value="3">Food & drink</option>
                  <option value="4">Automotive</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="quantity">Quantity</Label>
                <Input type="number" name="pQty" id="quantity" autoComplete="off" placeholder="Quantity" value={pQty} onChange={this.handlerChange} />
              </FormGroup>
            <ModalFooter>
              <Button type="submit" color="primary" onClick={this.toggle}>Edit data</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </form>
          </ModalBody>
        </Modal>  
      </div> */}
    </div> 
  ); 
}

  export default ProductItem;