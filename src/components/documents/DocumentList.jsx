import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchDocuments, deleteDocument } from '../../actions'
import ModalContent from '../ModalContent'
import Spinner from '../Spinner'
import history from '../../history'
import './Document.css'

class DocumentList extends React.Component {
	state = { modalShow: false }

	componentDidMount() {
		this.props.fetchDocuments()
	}

	modalClose = () => {
		this.setState({ modalShow: false, currentlySelectedDocument: null })
	}

	renderAdmin(document) {
		return (
			<div className="col-md-6">
				<Link to={`/documents/edit/${document._id}`} className="btn btn-outline-info px-4 mx-2">
					Edit
				</Link>

				<button
					className="btn btn-outline-danger px-3 mx-2"
					onClick={() => this.setState({ modalShow: true, currentlySelectedDocument: document })}
				>
					Delete
				</button>

				<ModalContent
					show={this.state.modalShow}
					onHide={this.modalClose}
					title={this.state.currentlySelectedDocument ? this.state.currentlySelectedDocument.title : null}
					message="Are you sure you want to delete this docling ?"
					warning="Please note that this will permanently delete your docling along with all the files associated with it. Those users who have bookmarked your docling will be affected."
					onConfirm={() => this.props.deleteDocument(this.state.currentlySelectedDocument._id)}
				/>
			</div>
		)
	}

	renderList() {
		return this.props.documents.map((document) => {
			const { isSignedIn, currentUserId } = this.props
			if (isSignedIn && currentUserId === document.userId) {
				return (
					<div className="shadow list-group-item mt-4 col-10 col-md-7" key={document._id}>
						<div className="row justify-content-center align-items-center px-4">
							<div className="col-md-6 pointer" onClick={() => history.push(`/documents/${document._id}`)}>
								<h5 className="text-dark">{document.title}</h5>
								<p>{document.description}</p>
							</div>
							{this.renderAdmin(document)}
						</div>
					</div>
				)
			} else {
				return (
					<div
						className="shadow list-group-item mt-4 col-10 col-md-7 px-5 pointer"
						key={document._id}
						onClick={() => history.push(`/documents/${document._id}`)}
					>
						<h5 className="text-dark">{document.title}</h5>
						<p>{document.description}</p>
					</div>
				)
			}
		})
	}

	render() {
		if (this.props.documents.length > 0) {
			return (
				<div className="list-group">
					<div className="row justify-content-center text-center mx-0">{this.renderList()}</div>
				</div>
			)
		}
		return <Spinner />
	}
}

const mapStateToProps = (state) => {
	return {
		documents: Object.values(state.documents),
		isSignedIn: state.auth.isSignedIn,
		currentUserId: state.auth.userId,
	}
}

export default connect(mapStateToProps, { fetchDocuments, deleteDocument })(DocumentList)
