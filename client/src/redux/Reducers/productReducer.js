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
  GET_PRODUCT_SUCCESS

} from "../Actionstypes/productsConst";

const initialState = {
  loading: false,
  products: [],
  errors: null,
  productEdit:{}
};
export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_PRODUCTS:
      return { ...state, loading: true };
    case GET_ALL_PRODUCTS_SUCCESS:
      return { ...state, products: payload.allProducts, loading: false };
    case GET_ALL_PRODUCTS_FAIL:
      return { ...state, errors: payload, loading: false };
    case DELETE_PRODUCT_FAIL:
      return { ...state, errors: payload };
    case ADD_PRODUCT_FAIL:
      return { ...state, errors: payload };
      case GET_PRODUCT_SUCCESS:
      return  {...state,productEdit:payload.oneProduct,loading:false}
    
    default:
      return state;
  }
};
