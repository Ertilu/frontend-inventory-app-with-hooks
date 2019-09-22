const initState = {
	token: '',
	username: '',
	email: '',
	message: '',
};

export default function(state = initState, action) {
	switch (action.type) {
		case 'LOGIN_USER':
			return {
				...state,
				token: action.payload.token,
				username: action.payload.username,
				email: action.payload.email,
			}
		case 'REGISTER_USER':
			return {
				...state,
				token: action.payload.token,
				username: action.payload.username,
				email: action.payload.email,
			}
		case 'FAIL':
			return {
				...state,
				message: action.message,
			}
		case 'LOG_OUT':
			return {
				initState
			}
		default:
			return state;
	}
}