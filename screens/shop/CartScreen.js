import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import colors from '../../constants/colors';

const CartScreen = props => {
	const cartTotalAmount = useSelector(state => state.cart.totalAmount);
	const cartItems = useSelector(state => {
		const transformedCartItems = [];
		for (const key in state.cart.items) {
			transformedCartItems.push({
				productId: key,
				productTitle: state.cart.items[key].productTitle,
				productPrice: state.cart.items[key].productPrice,
				quantity: state.cart.items[key].quantity,
				sum: state.cart.items[key].sum
			});
		}
		return transformedCartItems;
	});

	return (
		<View style={styles.screen}>
			<View style={styles.sumary}>
				<Text style={styles.sumaryText}>
					Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
				</Text>
				<Button title="Order Now" color={colors.accent} disabled={cartItems.length===0} />
			</View>
			<FlatList data={cartItems} keyExtractor={item => item.productId}
				renderItem={itemData => <CartItem 
					quantity={itemData.item.quantity}
					title={itemData.item.productTitle}
					amount={itemData.item.sum}
					onRemove={() => {}}
				/>}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		margin: 20
	},
	sumary: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		margin: 20,
		padding: 10,
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: 'white',
	},
	sumaryText: {
		fontFamily: 'open-sans-bold',
		fontSize: 18,
	},
	amount: {
		color: colors.accent
	}
});

export default CartScreen;