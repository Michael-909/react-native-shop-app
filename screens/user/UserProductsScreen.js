import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { Alert, Button } from 'react-native';
import { deleteProduct } from '../../store/actions/products';

const UserProductsScreen = props => {
	const userProducts = useSelector(state => state.products.userProducts);
	const dispatch = useDispatch();
	const editProductHandler = id => {
		props.navigation.navigate('EditProduct', {productId: id});
	};
	const deleteHandler = (id) => {
		Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
			{text: 'No', style: 'default'},
			{text: 'Yes', style: 'destructive', onPress:() => {
				dispatch(deleteProduct(id));
			}}
		]);
	};

	return <FlatList data={userProducts}
		keyExtractor={item => item.id}
		renderItem={itemData =>
			<ProductItem
				image={itemData.item.imageUrl}
				title={itemData.item.title}
				price={itemData.item.price}
				onSelect={editProductHandler.bind(this, itemData.item.id)}
			>
				<Button color={colors.primary}
					title="Edit"
					onPress={editProductHandler.bind(this, itemData.item.id)}
				/>
				<Button color={colors.primary}
					title="Delete"
					onPress={deleteHandler.bind(this, itemData.item.id)}
				/>
			</ProductItem>
		}
	/>;
};

UserProductsScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Your Products',
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
				<Item title='Add'
					iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
					onPress={() => {
						navData.navigation.navigate('EditProduct');
					}}
				/>
			</HeaderButtons>
		)},
	};
}

export default UserProductsScreen;