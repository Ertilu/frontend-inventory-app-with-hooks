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
				username: action.payload.user.username,
				email: action.payload.user.email,
			}
		case 'REGISTER_USER':
			return {
				...state,
				token: action.payload.token,
				username: action.payload.data.username,
				email: action.payload.data.email,
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