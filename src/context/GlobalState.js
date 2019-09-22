import React, { useState, useReducer, createContext } from 'react';
import axios from 'axios';

import { getCategory, createCategory, updateCategory, deleteCategory } from './actions/categoryActions';
import { loginUser, registerUser, logOut } from './actions/userActions';
import { getProducts, getProduct, createProduct, updateProduct, addOrReduce, deleteProduct, deleteSingleProduct } 
from './actions/productActions';


import productReducers from './reducers/productReducers';
import categoryReducers from './reducers/categoryReducers';
import userReducers from './reducers/userReducers';

export const GlobalContext = createContext();

export let dispatcher = {}

export const GlobalState = props => {
  const [product, dispatchProduct] = useReducer(productReducers, {product: {}});
  const [category, dispatchCategory] = useReducer(categoryReducers, {category: {}});
  const [user, dispatchUser] = useReducer(userReducers, {user: {}});

  const [isLoaded, setIsLoaded] = useState(false);
  const [isRedirected, setIsRedirected] = useState(false);
  const [isError, setIsError] = useState(false);

  dispatcher = {
    dispatchProduct,
    dispatchCategory,
    dispatchUser,
    setIsLoaded,
    setIsRedirected,
    setIsError
  }

  const productActions = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    addOrReduce,
    deleteProduct,
    deleteSingleProduct
  }

  const categoryActions = {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
  }

  const userActions = {
    loginUser,
    registerUser,
    logOut
  }

  // category, user,

  return (
    <GlobalContext.Provider
      value={{ product, category, user, isLoaded, isRedirected, isError,
               productActions, categoryActions, userActions }}
    >

      {props.children}

    </GlobalContext.Provider>
  );
};