import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT } from "../actions/products";

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
	else if(action.type == CREATE_PRODUCT) {
		const newProduct = new Product(
			action.productData.id,
			action.productData.ownerId,
			action.productData.title,
			action.productData.imageUrl,
			action.productData.description,
			action.productData.price,
		);
		return {
			...state,
			availableProducts: state.availableProducts.concat(newProduct),
			userProducts: state.userProducts.concat(newProduct),
		};
	}
	else if(action.type == UPDATE_PRODUCT) {
		const prodIndex = state.userProducts.findIndex(p => p.id === action.pid);
		const updatedProduct = new Product(
			action.pid,
			state.userProducts[prodIndex].ownerId,
			action.productData.title,
			action.productData.imageUrl,
			action.productData.description,
			state.userProducts[prodIndex].price
		);
		const updatedUserProducts = [...state.userProducts];
		updatedUserProducts[prodIndex] = updatedProduct;

		const availableProdIndex = state.availableProducts.findIndex(p => p.id === action.pid);
		const updatedAvailableProducts = [...state.availableProducts];
		updatedAvailableProducts[availableProdIndex] = updatedProduct;

		return {
			...state,
			availableProducts: updatedAvailableProducts,
			userProducts: updatedUserProducts
		};
	}
	else if(action.type == SET_PRODUCTS) {
		return {
			availableProducts: action.products,
			userProducts: action.userProducts
		};
	}
	else {
		return state;
	}
};
