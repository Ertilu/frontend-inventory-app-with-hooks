const initState = {
	categories: [],
};

export default function(state = initState, action) {
	switch (action.type) {
		case 'GET_CATEGORIES':
			return {
				...state,
				categories: action.payload.values
		}
		case 'CREATE_PRODUCT':
			return {
				...state,
			}
		case 'UPDATE_PRODUCT':
			return {
				...state,
			}
		case 'ADD_OR_REDUCE':
			return {
				...state,
				action: action.payload,
			}
		case 'DELETE_PRODUCT':
			return {
				...state,
				products: state.products.filter(product => product.id != action.payload.id),
			}
		case 'DELETE_SINGLE_PRODUCT':
			return {
				...state,
				products: {},
			}
		default:
			return state;
	}
}