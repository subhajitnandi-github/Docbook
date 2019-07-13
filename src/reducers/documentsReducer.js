import _ from 'lodash'

import {
	FETCH_DOCUMENTS,
	FETCH_DOCUMENT,
	EDIT_DOCUMENT,
	DELETE_DOCUMENT,
	CREATE_DOCUMENT
} from '../actions/types'

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_DOCUMENTS:
			return { ...state, ..._.mapKeys(action.payload, '_id') }
		case CREATE_DOCUMENT:
			return { ...state, [action.payload._id]: action.payload }
		case FETCH_DOCUMENT:
			return { ...state, [action.payload._id]: action.payload }
		case EDIT_DOCUMENT:
			return { ...state, [action.payload._id]: action.payload }
		case DELETE_DOCUMENT:
			return _.omit(state, action.payload)
		default:
			return state
	}
}
