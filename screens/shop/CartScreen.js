import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import colors from '../../constants/colors';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';

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
		return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
	});
	const dispatch = useDispatch();

	return (
		<View style={styles.screen}>
			<Card style={styles.sumary}>
				<Text style={styles.sumaryText}>
					Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
				</Text>
				<Button title="Order Now"
					color={colors.accent}
					disabled={cartItems.length===0}
					onPress={() => {
						dispatch(addOrder(cartItems, cartTotalAmount));
					}}
				/>
			</Card>
			<FlatList data={cartItems} keyExtractor={item => item.productId}
				renderItem={itemData => <CartItem 
					quantity={itemData.item.quantity}
					title={itemData.item.productTitle}
					amount={itemData.item.sum}
					deletable={true}
					onRemove={() => {
						dispatch(removeFromCart(itemData.item.productId));
					}}
				/>}
			/>
		</View>
	);
};

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
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