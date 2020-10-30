import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import ShopNavigator from './navigation/ShopNavigator';
import * as Font from 'expo-font';

import productReducer from './store/reducers/products';
import { AppLoading } from 'expo';

const rootReducer = combineReducers({
  products: productReducer
});

const store = createStore(rootReducer);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
