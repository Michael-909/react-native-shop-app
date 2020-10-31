import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import { createProduct, updateProduct } from '../../store/actions/products';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
	if(action.type === FORM_INPUT_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value
		};
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid
		};
		let updatedFormIsValid = true;
		for(const key in updatedValidities) updatedFormIsValid &= updatedValidities[key];

		return {
			...state,
			inputValues: updatedValues,
			inputValidities: updatedValidities,
			formIsValid: updatedFormIsValid
		};
	}
	return state;
};

const EditProductScreen = props => {
	const prodId = props.navigation.getParam('productId');
	const editedProduct = useSelector(state => state.products.userProducts.find(p => p.id === prodId));

	const dispatch = useDispatch();

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			title: editedProduct ? editedProduct.title : '',
			imageUrl: editedProduct ? editedProduct.imageUrl : '',
			description: editedProduct ? editedProduct.description : '',
			price: ''
		},
		inputValidities: {
			title: editedProduct ? true : false,
			imageUrl: editedProduct ? true : false,
			description: editedProduct ? true : false,
			price: editedProduct ? true : false,
		},
		formIsValid: editedProduct ? true : false
	});

	const submitHandler = useCallback(() => {
		if(!formState.formIsValid) {
			Alert.alert('Wrong Input!', 'Please check the errors', [{text: 'Okay'}])
			return;
		}
		if(editedProduct) {
			dispatch(updateProduct(prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl));
		} else {
			dispatch(createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price));
		}
		props.navigation.goBack();
	}, [dispatch, prodId, formState.inputValues]);

	useEffect(() => {
		props.navigation.setParams({submit: submitHandler});
	}, [submitHandler]);

	const textChangeHandler = (inputField, text) => {
		const isValid = text.trim().length > 0;
		dispatchFormState({
			type: FORM_INPUT_UPDATE,
			value: text,
			isValid: isValid,
			input: inputField
		});
	};

	return <ScrollView>
		<View styles={styles.form}>
			<View style={styles.formControl}>
				<Text style={styles.label}>Title</Text>
				<TextInput style={styles.input} value={formState.inputValues.title}
					onChangeText={textChangeHandler.bind(this, 'title')}
					keyboardType='default'
					autoCapitalize='sentences'
					autoCorrect
					returnKeyType='next'
				/>
				{!formState.inputValidities.title && <Text>Please enter a valid title!</Text>}
			</View>
			<View style={styles.formControl}>
				<Text style={styles.label}>Image URL</Text>
				<TextInput style={styles.input} value={formState.inputValues.imageUrl}
					onChangeText={textChangeHandler.bind(this, 'imageUrl')}
				/>
				{!formState.inputValidities.imageUrl && <Text>Please enter a valid image url!</Text>}
			</View>
			{!editedProduct && <View style={styles.formControl}>
				<Text style={styles.label}>Price</Text>
				<TextInput style={styles.input} value={formState.inputValues.price}
					onChangeText={textChangeHandler.bind(this, 'price')}
					keyboardType='decimal-pad'
				/>
				{!formState.inputValidities.price && <Text>Please enter a valid price!</Text>}
			</View>}
			<View style={styles.formControl}>
				<Text style={styles.label}>Description</Text>
				<TextInput style={styles.input} value={formState.inputValues.description}
					onChangeText={textChangeHandler.bind(this, 'description')}
				/>
				{!formState.inputValidities.description && <Text>Please enter a valid description!</Text>}
			</View>
		</View>
	</ScrollView>;
};

EditProductScreen.navigationOptions = navData => {
	const submitFn = navData.navigation.getParam('submit');
	return {
		headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
		headerRight: () => {return(
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item title='Save'
					iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
					onPress={submitFn}
				/>
			</HeaderButtons>
		)}
	};
};

const styles = StyleSheet.create({
	form: {
		margin: 20,
		padding: 20
	},
	formControl: {
		width: '100%',
	},
	label: {
		fontFamily: 'open-sans-bold',
		marginVertical: 8
	},
	input: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1
	},
});

export default EditProductScreen;