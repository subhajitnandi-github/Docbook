import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_DOCUMENT,
	FETCH_DOCUMENT,
	EDIT_DOCUMENT,
	DELETE_DOCUMENT,
	FETCH_DOCUMENTS,
	ERROR
} from './types'
import docbookApi from '../apis/docbookApi'
import history from '../history'

export const SignIn = (userId, username) => {
	return {
		type: SIGN_IN,
		payload: { userId, username }
	}
}

export const SignOut = () => {
	return {
		type: SIGN_OUT
	}
}

export const createDocument = formData => {
	return async (dispatch, getState) => {
		const { userId, username } = getState().auth

		formData.append('userId', userId)
		formData.append('username', username)

		try {
			const response = await docbookApi.post('/documents/new', formData, {
				headers: {
					'content-type': `multipart/form-data`
				}
			})

			// console.log(response)

			dispatch({
				type: CREATE_DOCUMENT,
				payload: response.data
			})

			history.push('/')
		} catch (err) {
			dispatch({
				type: ERROR,
				payload: err.message
			})
			history.push('/error')
		}
	}
}

export const fetchDocuments = () => {
	// console.log(history)
	return async dispatch => {
		try {
			const response = await docbookApi.get('/documents')
			dispatch({
				type: FETCH_DOCUMENTS,
				payload: response.data
			})
		} catch (err) {
			dispatch({
				type: ERROR,
				payload: err.message
			})
			history.push('/error')
		}
	}
}

export const fetchDocument = id => {
	return async dispatch => {
		try {
			const response = await docbookApi.get(`/documents/${id}`)
			dispatch({
				type: FETCH_DOCUMENT,
				payload: response.data
			})
		} catch (err) {
			dispatch({
				type: ERROR,
				payload: err.message
			})
			history.push('/error')
		}
	}
}

export const editDocument = (id, formValues) => {
	return async dispatch => {
		try {
			const response = await docbookApi.patch(`/documents/${id}`, formValues)

			dispatch({
				type: EDIT_DOCUMENT,
				payload: response.data
			})

			history.push('/my_documents')
		} catch (err) {
			dispatch({
				type: ERROR,
				payload: err.message
			})
			history.push('/error')
		}
	}
}

export const deleteDocument = id => {
	return async dispatch => {
		try {
			await docbookApi.delete(`/documents/${id}`)
			dispatch({
				type: DELETE_DOCUMENT,
				payload: id
			})

			history.push('/my_documents')
		} catch (err) {
			dispatch({
				type: ERROR,
				payload: err.message
			})
			history.push('/error')
		}
	}
}
