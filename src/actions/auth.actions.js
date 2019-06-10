import { authConstants, alertConstants } from '../constants';
import { dataService } from '../services';
import { history } from '../helpers';

function donorLogin(email, password) {
	return dispatch => {
		dispatch(request({ email }));

		dataService(
			dispatch,
			'post',
			'/api/auth/donor/login/',
			{ email, password },
			true
		)
			.then(data => {
				if (data.token) {
					// store jwt token in local storage to keep user logged in between page refreshes
					localStorage.setItem(
						'auth',
						JSON.stringify({ userType: 'donor', token: data.token })
					);
				}

				// can use for permissions
				data.user.type = 'donor';
				dispatch(success({ message: data.message, user: data.user }));

				history.push('/main');
			})
			.catch(error => {
				dispatch(failure(error));
			});
	};

	function request(user) {
		return { type: authConstants.DONOR_LOGIN_REQUEST, payload: user };
	}
	function success(data) {
		return { type: authConstants.DONOR_LOGIN_SUCCESS, payload: data };
	}
	function failure(error) {
		return { type: authConstants.DONOR_LOGIN_FAILURE, payload: error };
	}
}

function orgLogin(email, password) {
	return dispatch => {
		dispatch(request({ email }));

		dataService(
			dispatch,
			'post',
			'/api/auth/org/login/',
			{ email, password },
			true
		)
			.then(data => {
				if (data.token) {
					// store jwt token in local storage to keep user logged in between page refreshes
					localStorage.setItem(
						'auth',
						JSON.stringify({ token: data.token, userType: 'org' })
					);
				}

				// can use for permissions
				data.user.type = 'organization';
				dispatch(success({ message: data.message, user: data.user }));

				history.push('/org/main');
			})
			.catch(error => {
				dispatch(failure(error));
			});
	};

	function request(user) {
		return { type: authConstants.ORGANIZATION_LOGIN_REQUEST, payload: user };
	}
	function success(data) {
		return { type: authConstants.ORGANIZATION_LOGIN_SUCCESS, payload: data };
	}
	function failure(error) {
		return { type: authConstants.ORGANIZATION_LOGIN_FAILURE, payload: error };
	}
}

// synchronous/blocks
function logout() {
	localStorage.removeItem('auth');

	history.push('/');
	return { type: authConstants.LOGOUT };
}

function resetPasswordEmail(email, userType) {
	return dispatch => {
		dispatch(request({ email }));

		dataService(
			dispatch,
			'get',
			'/api/auth/resetpassword',
			{ email, usertype: userType },
			false
		)
			.then(data => {
				dispatch(success(data));

				history.push('/');

				dispatch({
					type: alertConstants.SHOW_SNACK_BAR,
					alertMessage: 'Sent Password Reset Email!'
				});
			})
			.catch(error => {
				dispatch(failure(error));

				dispatch({
					type: alertConstants.SHOW_SNACK_BAR,
					alertMessage: error.data.error
				});
			});
	};

	function request(user) {
		return {
			type: authConstants.USER_RESET_PASSWORD_EMAIL_REQUEST,
			payload: user
		};
	}
	function success(data) {
		return {
			type: authConstants.USER_RESET_PASSWORD_EMAIL_SUCCESS,
			payload: data
		};
	}
	function failure(error) {
		return {
			type: authConstants.USER_RESET_PASSWORD_EMAIL_FAILURE,
			payload: error
		};
	}
}

function resetPassword(password, code) {
	return dispatch => {
		dispatch(request());

		dataService(
			dispatch,
			'post',
			'/api/auth/resetpassword',
			{ password, code },
			false
		)
			.then(data => {
				dispatch(success(data));

				history.push('/');

				dispatch({
					type: alertConstants.SHOW_SNACK_BAR,
					alertMessage: 'Successfully reset password!'
				});
			})
			.catch(error => {
				dispatch(failure(error));

				dispatch({
					type: alertConstants.SHOW_SNACK_BAR,
					alertMessage: error.data.error
				});
			});
	};

	function request(user) {
		return { type: authConstants.USER_RESET_PASSWORD_REQUEST, payload: user };
	}
	function success(data) {
		return { type: authConstants.USER_RESET_PASSWORD_SUCCESS, payload: data };
	}
	function failure(error) {
		return { type: authConstants.USER_RESET_PASSWORD_FAILURE, payload: error };
	}
}

export const authActions = {
	donorLogin,
	orgLogin,
	logout,
	resetPasswordEmail,
	resetPassword
};
