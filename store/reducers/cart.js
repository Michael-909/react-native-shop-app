import CartItem from "../../models/cart-item";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

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
		case REMOVE_FROM_CART:
			const currentItem = state.items[action.pid];
			let updatedCartItems;
			if(currentItem.quantity > 1) {
				const updatedCartItem = new CartItem(
					currentItem.quantity - 1,
					currentItem.productPrice,
					currentItem.productTitle,
					currentItem.sum - currentItem.productPrice
				);
				updatedCartItems = {...state.items, [action.pid]: updatedCartItem };
			} else {
				updatedCartItems = { ...state.items };
				delete updatedCartItems[action.pid];
			}
			return {
				...state,
				items: updatedCartItems,
				totalAmount: state.totalAmount - currentItem.productPrice
			};
		case ADD_ORDER:
			return initialState;
		case DELETE_PRODUCT: 
			if(!state.items[action.pid]) {
				return state;
			}
			const updatedItems = {...state.items};
			const itemTotal = state.items[action.pid].sum;
			delete updatedItems[action.pid];
			return {
				...state,
				items: updatedItems,
				totalAmount: state.totalAmount - itemTotal
			};
		default:
			return state;
	}
};