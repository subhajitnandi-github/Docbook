import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import authReducer from './authReducer'
import documentsReducer from './documentsReducer'
import errorReducer from './errorReducer'

export default combineReducers({
	auth: authReducer,
	form: formReducer,
	documents: documentsReducer,
	error: errorReducer
})
