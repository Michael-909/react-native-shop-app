import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;
		const response = await fetch(`https://react-native-shop-app-850ef.firebaseio.com/orders/${userId}.json`);
		if(!response.ok) {
			throw new Error('Something went wrong!');
		}
		const result = await response.json();
		const loadedOrders = [];
		for(const key in result) {
			loadedOrders.push(new Order(
				key, result[key].cartItems, result[key].totalAmount, new Date(result[key].date)
			));
		}

		dispatch({
			type: SET_ORDERS,
			orders: loadedOrders
		});
	};
};

export const addOrder = (cartItems, totalAmount) => {
	return async (dispatch, getState) => {
		const token = getState().auth.token;
		const userId = getState().auth.userId;
		const date = new Date();
		const response = await fetch(`https://react-native-shop-app-850ef.firebaseio.com/orders/${userId}.json?auth=${token}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				cartItems,
				totalAmount,
				date: date.toISOString()
			})
		});
		if(!response.ok) {
			throw new Error('Something went wrong!');
		}
		const result = await response.json();

		dispatch({
			type: ADD_ORDER,
			orderData: {
				id: result.name,
				items: cartItems,
				amount: totalAmount,
				date
			}
		});
	};
};