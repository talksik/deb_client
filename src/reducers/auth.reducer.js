let have_token = JSON.parse(localStorage.getItem('auth')) ? true : false;

const INITIAL_STATE = {
	have_token,
	user: null,
	loading: false,
	error: null,
	signed_up: null
};

export function authentication(state = INITIAL_STATE, action) {
	switch (action.type) {
		default:
			return state;
	}
}
