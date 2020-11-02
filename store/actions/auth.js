export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password ) => {
	return async dispatch => {
		const response = await fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyALlYyePbADCjt_DrIjd-XZnMkilnZOnbs`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true
				})
			}
		);
		if(!response.ok) {
			const error = await response.json();
			const errorId = error.error.message;
			let message = 'Something went wrong!';
			if (errorId === 'EMAIL_EXISTS') {
			  message = 'This email exists already!';
			}
			throw new Error(message);
		}
		const result = await response.json();

		dispatch({
			type: SIGNUP,
			token: result.idToken,
			userId: result.localId
		});
	};
};

export const login = (email, password ) => {
	return async dispatch => {
		const response = await fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyALlYyePbADCjt_DrIjd-XZnMkilnZOnbs`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true
				})
			}
		);
		if(!response.ok) {
			const error = await response.json();
			const errorId = error.error.message;
			let message = 'Something went wrong!';
			if (errorId === 'EMAIL_NOT_FOUND') {
			  message = 'This email could not be found!';
			} else if (errorId === 'INVALID_PASSWORD') {
			  message = 'This password is not valid!';
			}
			throw new Error(message);
		}
		const result = await response.json();

		dispatch({
			type: LOGIN,
			token: result.idToken,
			userId: result.localId
		});
	};
};