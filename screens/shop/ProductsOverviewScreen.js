import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import colors from '../../constants/colors';

import { addToCart } from '../../store/actions/cart';
import { fetchProducts } from '../../store/actions/products';

const ProductsOverviewScreen = props => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const products = useSelector(state => state.products.availableProducts);
	const dispatch = useDispatch();

	const loadProducts = useCallback(async () => {
		setError(null);
		setIsLoading(true);
		try {
			await dispatch(fetchProducts());
		} catch(err) {
			setError(err.message);
		}
		setIsLoading(false);
	}, [dispatch, setIsLoading, setError]);

	useEffect(() => {
		const willFocusSub = props.navigation.addListener('willFocus', loadProducts);
		return () => {
			willFocusSub.remove();
		};
	}, [loadProducts]);

	useEffect(() => {
		loadProducts();
	}, [dispatch, loadProducts]);

	const selectItemHandler = (id, title) => {
		props.navigation.navigate('ProductDetail', {
			productId: id,
			productTitle: title
		});
	};

	if(error) {
		return <View style={styles.centered}>
			<Text>{error}</Text>
			<Button title="Try again" onPress={loadProducts} color={colors.primary} />
		</View>;
	}
	if (isLoading) {
		return <View style={styles.centered}>
			<ActivityIndicator size='large' color={colors.primary} />
		</View>;
	}
	if(!isLoading && products.length === 0) {
		return <View style={styles.centered}>
			<Text>No products found. Maybe start adding some!</Text>
		</View>;
	}

	return (
		<FlatList data={products}
			keyExtractor={item => item.id}
			renderItem={itemData => 
				<ProductItem 
					image={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
					onSelect={()=>{
						selectItemHandler(itemData.item.id, itemData.item.title);
					}}
				>
					<Button color={colors.primary}
						title="View Details"
						onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)}
					/>
					<Button color={colors.primary}
						title="To Cart"
						onPress={() => dispatch(addToCart(itemData.item))}
					/>
				</ProductItem>
			}
		/>
	);
};

ProductsOverviewScreen.navigationOptions = navData => {
	return {
		headerTitle: 'All Products',
		headerLeft: () => {return(
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item title='Menu'
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		)},
		headerRight: () => {return(
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item title='Cart'
					iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
					onPress={() => {
						navData.navigation.navigate('Cart')
					}}
				/>
			</HeaderButtons>
		)}
	};
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default ProductsOverviewScreen;