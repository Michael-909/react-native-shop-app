import CartItem from "../../models/cart-item";
import { ADD_TO_CART } from "../actions/cart";

const initialState = {
    items: {},
    totalAmount: 0
};

export default cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            let item = null;
            if(state.items[action.product.id]) {
                item = new CartItem(
                    state.items[action.product.id].quantity + 1,
                    action.product.price,
                    action.product.title,
                    state.items[action.product.id].sum + action.product.price
                );
            } else {
                item = new CartItem(
                    1,
                    action.product.price,
                    action.product.title,
                    action.product.price
                );
            }
            return {
                ...state,
                items: {...state.items, [action.product.id]: item},
                totalAmount: state.totalAmount + action.product.price
            };
    default:
        return state;
    }
};