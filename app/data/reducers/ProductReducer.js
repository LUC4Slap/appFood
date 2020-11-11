import {PRODUCTS_RESPONSE, PRODUCT_SELECT} from '../actions/ProductActions';

export const initialState = {
  productList: [],
  selectedProduct: null,
};

export const ProductReducer = (store = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_RESPONSE:
      return {...store, productList: action.valeu};
      break;
    case PRODUCT_SELECT:
      return {...store, selectedProduct: action.valeu};
      break;
    default:
      return store;
  }
};
