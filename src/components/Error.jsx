import React from 'react'
import { connect } from 'react-redux'

function Error(props) {
	return (
		<div className="row vh-100 justify-content-center mx-0 align-items-center text-center">
			<div className="col-10 col-md-6">
				<div className="card border-danger">
					<div className="card-header">Hmm...</div>
					<div className="card-body text-danger">
						<h5 className="card-title">{props.error}</h5>
						<p className="card-text">Something went wrong. Please try again.</p>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		error: state.error
	}
}

export default connect(mapStateToProps)(Error)
