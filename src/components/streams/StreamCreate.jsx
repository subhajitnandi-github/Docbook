import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { createStream } from '../../actions'

class StreamCreate extends React.Component {
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
		this.props.createStream(formValues)
	}

	render() {
		return (
			<div className="grid">
				<div className="row justify-content-center mx-0">
					<div className="col-10 col-md-7">
						<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
							<div className="form-group">
								<Field name="title" component={this.renderInput} label="Enter title" />
								<Field
									name="description"
									component={this.renderTextArea}
									label="Enter description"
								/>
							</div>
							<button type="submit" className="btn btn-primary btn-lg mt-2 px-5">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		)
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

const formWrapped = reduxForm({
	form: 'streamCreate',
	validate
})(StreamCreate)

export default connect(
	null,
	{ createStream }
)(formWrapped)
