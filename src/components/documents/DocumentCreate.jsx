import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'

import { createDocument } from '../../actions'
import { capitalizeTitle } from '../../helperFunctions'
import './Document.css'
import SignInPrompt from '../SignInPrompt'

class DocumentCreate extends React.Component {
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

	renderDropzoneInput = ({ input, meta }) => {
		const file = input.value[0]
		const className = `form-control ${meta.error && meta.touched ? 'border-danger' : ''}`

		return (
			<div className="mt-5">
				<Dropzone name={input.name} onDrop={(filesToUpload, e) => input.onChange(filesToUpload)}>
					{({ getRootProps, getInputProps }) => (
						<section className={`${className} w-75 text-center h-100 mx-auto bg-info text-white`}>
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								<h5>{file ? file.name : `Drag 'n' drop, or click to select file`}</h5>
							</div>
						</section>
					)}
				</Dropzone>

				{this.renderError(meta)}
			</div>
		)
	}

	onSubmit = formValues => {
		var body = new FormData()
		// Object.keys(formValues).forEach(key => {
		// 	body.append(key, formValues[key])
		// })

		body.append('file', formValues.file[0])
		body.append('title', capitalizeTitle(formValues.title))
		body.append(
			'description',
			`${formValues.description[0].toUpperCase()}${formValues.description.substring(1)}`
		)

		// let bodyValues = []

		// for (let i of body.values()) {
		// 	bodyValues.push(i)
		// }

		// console.log(bodyValues, formValues)

		this.props.createDocument(body)
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
								<Field name="file" component={this.renderDropzoneInput} />
							</div>
							<button type="submit" className="btn btn-success btn-lg mt-4 px-5 responsive-width">
								Create
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
	if (!formValues.file || formValues.file[0].name.indexOf('.pdf') === -1) {
		errors.file = 'Please select a valid file to upload'
	}

	return errors
}

const mapStateToProps = state => {
	return {
		isSignedIn: state.auth.isSignedIn
	}
}

const formWrapped = reduxForm({
	form: 'documentCreate',
	validate
})(DocumentCreate)

export default connect(
	mapStateToProps,
	{ createDocument }
)(formWrapped)
