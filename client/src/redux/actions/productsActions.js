import {
  LOAD_PRODUCTS,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
} from "../Actionstypes/productsConst";
import axios from "axios";

export const getAllProducts = () => async (dispatch) => {
  dispatch({ type: LOAD_PRODUCTS });
  try {
    const response = await axios.get("http://localhost:5000/product/");
    dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_ALL_PRODUCTS_FAIL, payload: error });
  }
};

export const deleteProduct = (idProduct) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/product/${idProduct}`
    );
    dispatch({ type: DELETE_PRODUCT_SUCCESS });
    dispatch(getAllProducts());
  } catch (error) {
    console.dir(error);
    dispatch({ type: DELETE_PRODUCT_FAIL, payload: error });
  }
};

export const addProduct = (newProduct, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/product/addProduct",
      newProduct
    );
    console.log(response);
    dispatch({ type: ADD_PRODUCT_SUCCESS });
    dispatch(getAllProducts());
    navigate("/");
  } catch (error) {
    console.dir(error);
    dispatch({ type: ADD_PRODUCT_FAIL, payload: error });
  }
};
export const editProduct = (Productedit,idProduct,navigate) => async dispatch => {
  try {
    const response = await axios.put(`http://localhost:5000/product/${idProduct}`,Productedit);
    console.log(response)
    dispatch({ type: EDIT_PRODUCT_SUCCESS });
    dispatch(getAllProducts());
    navigate("/")
  } catch (error) {
    console.dir(error);
    dispatch({ type: EDIT_PRODUCT_FAIL, payload: error });
  }
};

export const getOneProduct = (idProduct) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/product/${idProduct}`
    );
    dispatch({ type: GET_PRODUCT_SUCCESS, payload: response.data });
  } catch (err) {
    console.dir(err);
    dispatch({ type: GET_PRODUCT_FAIL, payload: err });
  }
};
