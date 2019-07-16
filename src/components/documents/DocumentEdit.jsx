import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchDocument, editDocument } from '../../actions'
import { capitalizeTitle } from '../../helperFunctions'
import './Document.css'
import SignInPrompt from '../SignInPrompt'

class DocumentEdit extends React.Component {
	componentDidMount() {
		this.props.fetchDocument(this.props.match.params.id)
	}

	renderError({ touched, error }) {
		if (touched && error) {
			return <small className="form-text text-danger">{error}</small>
		}
	}

	renderInput = ({ input, label, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'border-danger' : ''}`
		return (
			<div className="mt-4">
				<label>{label}</label>
				<input {...input} className={className} />
				{this.renderError(meta)}
			</div>
		)
	}

	renderTextArea = ({ input, label, meta }) => {
		const className = `form-control ${meta.error && meta.touched ? 'border-danger' : ''}`
		return (
			<div className="mt-4">
				<label>{label}</label>
				<textarea {...input} className={className} />
				{this.renderError(meta)}
			</div>
		)
	}

	onSubmit = formValues => {
		// console.log(formValues)
		formValues.title = capitalizeTitle(formValues.title)
		formValues.description = `${formValues.description[0].toUpperCase()}${formValues.description.substring(
			1
		)}`
		this.props.editDocument(this.props.match.params.id, formValues)
	}

	render() {
		if (this.props.isSignedIn) {
			return (
				<div className="row justify-content-center mx-0">
					<div className="col-10 col-md-6">
						<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
							<div className="form-group">
								<Field name="title" component={this.renderInput} label="Enter title" />
								<Field
									name="description"
									component={this.renderTextArea}
									label="Enter description"
								/>
							</div>
							<button type="submit" className="btn btn-success btn-lg mt-4 px-5 responsive-width">
								Update
							</button>
						</form>
					</div>
				</div>
			)
		} else {
			return <SignInPrompt />
		}
	}
}

const validate = formValues => {
	const errors = {}
	if (!formValues.title) {
		errors.title = 'Please enter a title.'
	}
	if (!formValues.description) {
		errors.description = 'Please enter a description.'
	}

	return errors
}

const mapStateToProps = (state, ownProps) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		initialValues: _.pick(state.documents[ownProps.match.params.id], 'title', 'description')
		// very special prop, used by redux-form to set initial values of the fields
	}
}

const formWrapped = reduxForm({
	form: 'documentEdit',
	validate,
	enableReinitialize: true
})(DocumentEdit)

export default connect(
	mapStateToProps,
	{ fetchDocument, editDocument }
)(formWrapped)
