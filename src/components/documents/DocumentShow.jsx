import React from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Moment from 'react-moment'

import { fetchDocument } from '../../actions'
import Spinner from '../Spinner'
import './Document.css'

class DocumentShow extends React.Component {
	componentDidMount() {
		this.props.fetchDocument(this.props.match.params.id)
	}

	render() {
		if (this.props.document) {
			const { fileLink, title, description, username, createdAt } = this.props.document
			return (
				<div className="row justify-content-center mx-0">
					<div className="col-md-6">
						<iframe
							src={`https://docs.google.com/gview?url=${fileLink}&embedded=true`}
							className="responsive-pdf"
							title={title}
						/>
					</div>
					<div className="col-md-6">
						<Card bg="light" className="text-center mt-4 mt-md-5 mr-md-2">
							<Card.Header>{username}</Card.Header>
							<Card.Body>
								<Card.Title>{title}</Card.Title>
								<Card.Text>{description}</Card.Text>
							</Card.Body>
							<Card.Footer className="text-muted">
								Created{' '}
								<Moment format="LL" fromNowDuring={259200000}>
									{createdAt}
								</Moment>
							</Card.Footer>
						</Card>
					</div>
				</div>
			)
		} else {
			return <Spinner />
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		document: state.documents[ownProps.match.params.id]
	}
}

export default connect(
	mapStateToProps,
	{ fetchDocument }
)(DocumentShow)
