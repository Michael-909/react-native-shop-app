import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(x => x.ownerId === 'u1')
};

export default productsReducer = (state = initialState, action) => {
    if(action.type == DELETE_PRODUCT) {
        return {
            ...state,
            userProducts: state.userProducts.filter(x => x.id !== action.pid),
            availableProducts: state.availableProducts.filter(x => x.id !== action.pid)
        };
    }
    else {
        return state;
    }
};
