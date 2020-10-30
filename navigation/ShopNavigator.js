import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

import colors from '../constants/colors';

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: colors.primary
        },
        headerTintColor: 'white',
    }
});

export default createAppContainer(ProductsNavigator);