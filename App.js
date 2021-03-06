import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ShopNavigator from './navigation/ShopNavigator';
import * as Font from 'expo-font';

import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import { AppLoading } from 'expo';

const rootReducer = combineReducers({
	auth: authReducer,
	products: productReducer,
	cart: cartReducer,
	orders: ordersReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
	});
}

export default function App() {
	const [fontloaded, setFontLoaded] = useState(false);

	if(!fontloaded) {
		return <AppLoading
			startAsync={fetchFonts}
			onFinish={() => {
				setFontLoaded(true);
			}}
		/>
	}

	return (
		<Provider store={store}>
			<ShopNavigator />
			<StatusBar style="auto" />
		</Provider>
	);
}
