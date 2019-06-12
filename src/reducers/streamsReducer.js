import _ from 'lodash';

import { FETCH_STREAMS, FETCH_STREAM, EDIT_STREAM, DELETE_STREAM, CREATE_STREAM } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case CREATE_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case FETCH_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case EDIT_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case DELETE_STREAM:
			return _.omit(state, action.payload.id);
		default:
			return state;
	}
};
