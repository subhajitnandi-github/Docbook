import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_DOCUMENT,
	FETCH_DOCUMENT,
	EDIT_DOCUMENT,
	DELETE_DOCUMENT,
	FETCH_DOCUMENTS
} from './types'
import docbookApi from '../apis/docbookApi'
import history from '../history'

export const SignIn = userId => {
	return {
		type: SIGN_IN,
		payload: userId
	}
}

export const SignOut = () => {
	return {
		type: SIGN_OUT
	}
}

export const createDocument = formValues => {
	return async (dispatch, getState) => {
		const { userId } = getState().auth
		const response = await docbookApi.post('/documents/new', {
			...formValues,
			userId
		})
		dispatch({
			type: CREATE_DOCUMENT,
			payload: response.data
		})
		history.push('/')
	}
}

export const fetchDocuments = () => {
	return async dispatch => {
		const response = await docbookApi.get('/documents')
		dispatch({
			type: FETCH_DOCUMENTS,
			payload: response.data
		})
	}
}

export const fetchDocument = id => {
	return async dispatch => {
		const response = await docbookApi.get(`/documents/${id}`)
		dispatch({
			type: FETCH_DOCUMENT,
			payload: response.data
		})
	}
}

export const editDocument = id => {
	return async dispatch => {
		const response = await docbookApi.put(`/documents/${id}`)
		dispatch({
			type: EDIT_DOCUMENT,
			payload: response.data
		})
	}
}

export const deleteDocument = id => {
	return async dispatch => {
		await docbookApi.delete(`/documents/${id}`)
		dispatch({
			type: DELETE_DOCUMENT,
			payload: id
		})
	}
}
