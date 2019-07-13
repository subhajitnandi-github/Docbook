import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchDocuments } from '../../actions'

class DocumentList extends React.Component {
	componentDidMount() {
		this.props.fetchDocuments()
	}

	renderAdmin(document) {
		return (
			<div className="col-md-6">
				<Link to={`/documents/edit/${document._id}`} className="btn btn-outline-info px-4 mx-2">
					Edit
				</Link>
				<button type="button" className="btn btn-outline-danger px-3 mx-2">
					Delete
				</button>
			</div>
		)
	}

	renderList() {
		return this.props.documents.map(document => {
			const { isSignedIn, currentUserId } = this.props
			if (isSignedIn && currentUserId === document.userId) {
				return (
					<div className="shadow list-group-item mt-4 col-10 col-md-7" key={document._id}>
						<div className="row justify-content-center align-items-center px-4">
							<div className="col-md-6">
								<h5>{document.title}</h5>
								<p>{document.description}</p>
							</div>
							{this.renderAdmin(document)}
						</div>
					</div>
				)
			} else {
				return (
					<div className="shadow list-group-item mt-4 col-10 col-md-7 px-5" key={document._id}>
						<h5>{document.title}</h5>
						<p>{document.description}</p>
					</div>
				)
			}
		})
	}

	render() {
		return (
			<div className="list-group">
				<div className="row justify-content-center text-center mx-0">{this.renderList()}</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		documents: Object.values(state.documents),
		isSignedIn: state.auth.isSignedIn,
		currentUserId: state.auth.userId
	}
}

export default connect(
	mapStateToProps,
	{ fetchDocuments }
)(DocumentList)
