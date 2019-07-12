import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	FETCH_STREAM,
	EDIT_STREAM,
	DELETE_STREAM,
	FETCH_STREAMS
} from './types'
import streamyApi from '../apis/streamyApi'
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

export const createStream = formValues => {
	return async (dispatch, getState) => {
		const { userId } = getState().auth
		const response = await streamyApi.post('/streams/new', {
			...formValues,
			userId
		})
		dispatch({
			type: CREATE_STREAM,
			payload: response.data
		})
		history.push('/')
	}
}

export const fetchStreams = () => {
	return async dispatch => {
		const response = await streamyApi.get('/streams')
		dispatch({
			type: FETCH_STREAMS,
			payload: response.data
		})
	}
}

export const fetchStream = id => {
	return async dispatch => {
		const response = await streamyApi.get(`/streams/${id}`)
		dispatch({
			type: FETCH_STREAM,
			payload: response.data
		})
	}
}

export const editStream = id => {
	return async dispatch => {
		const response = await streamyApi.put(`/streams/${id}`)
		dispatch({
			type: EDIT_STREAM,
			payload: response.data
		})
	}
}

export const deleteStream = id => {
	return async dispatch => {
		await streamyApi.delete(`/streams/${id}`)
		dispatch({
			type: DELETE_STREAM,
			payload: id
		})
	}
}
