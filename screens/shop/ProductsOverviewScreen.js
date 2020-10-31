import React from 'react';
import { FlatList, Platform, StyleSheet, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';

import { addToCart } from '../../store/actions/cart';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    
    const dispatch = useDispatch(); 

    return (
        <FlatList data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => 
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetail={()=>{
                        props.navigation.navigate('ProductDetail', {
                            productId: itemData.item.id,
                            productTitle: itemData.item.title
                        })
                    }}
                    onAddToCart={()=>{
                        dispatch(addToCart(itemData.item));
                    }}
                />
            }
        />
    );
};

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
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
});

export default ProductsOverviewScreen;