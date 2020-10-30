import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

import colors from '../constants/colors';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: colors.primary
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: 'white',
    }
});

export default createAppContainer(ProductsNavigator);