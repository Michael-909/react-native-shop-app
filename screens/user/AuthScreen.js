import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import colors from '../../constants/colors';

const AuthScreen = props => {
	return <KeyboardAvoidingView behavior='padding'
		keyboardVerticalOffset={50}
		style={styles.screen}>
		<LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
			<Card style={styles.authContainer}>
				<ScrollView>
					<Input id="email" label="E-Mail"
						keyboardType="email-address"
						required email autoCapitalize="none"
						errorMessage="Please enter a valid email address."
						onInputChange={()=>{}}
						initialValue=""
					/>
					<Input id="password" label="Password"
						keyboardType="default"
						secureTextEntry
						required
						minLength={5}
						autoCapitalize="none"
						errorMessage="Please enter a valid password."
						onInputChange={()=>{}}
						initialValue=""
					/>
					<View style={styles.buttonContainer}>
						<Button title="Login"
							color={colors.primary}
							onPress={() => {}}
						/>
					</View>
					<View style={styles.buttonContainer}>
						<Button title="Swich to Sign Up"
							color={colors.accent}
							onPress={() => {}}
						/>
					</View>
				</ScrollView>
			</Card>
		</LinearGradient>
	</KeyboardAvoidingView>;
};

AuthScreen.navigationOptions = {
	headerTitle: 'Authenticate',
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	authContainer: {
		width: '80%',
		maxWidth: 400,
		maxHeight: 400,
		padding: 20
	},
	gradient: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonContainer: {
		marginTop: 10
	}
});

export default AuthScreen;