export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const date = new Date();
        const response = await fetch('https://react-native-shop-app-850ef.firebaseio.com/orders/u1.json', {
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