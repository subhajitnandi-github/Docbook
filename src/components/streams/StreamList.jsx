import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchStreams } from '../../actions'

class StreamList extends React.Component {
	componentDidMount() {
		this.props.fetchStreams()
	}

	renderAdmin(stream) {
		return (
			<div className="col-md-6">
				<Link to={`/streams/edit/${stream._id}`} className="btn btn-outline-info px-4 mx-2">
					Edit
				</Link>
				<button type="button" className="btn btn-outline-danger px-3 mx-2">
					Delete
				</button>
			</div>
		)
	}

	renderList() {
		return this.props.streams.map(stream => {
			const { isSignedIn, currentUserId } = this.props
			if (isSignedIn && currentUserId === stream.userId) {
				return (
					<div className="shadow list-group-item mt-4 col-10 col-md-7" key={stream._id}>
						<div className="row justify-content-center align-items-center px-4">
							<div className="col-md-6">
								<h5>{stream.title}</h5>
								<p>{stream.description}</p>
							</div>
							{this.renderAdmin(stream)}
						</div>
					</div>
				)
			} else {
				return (
					<div className="shadow list-group-item mt-4 col-10 col-md-7 px-5" key={stream._id}>
						<h5>{stream.title}</h5>
						<p>{stream.description}</p>
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
		streams: Object.values(state.streams),
		isSignedIn: state.auth.isSignedIn,
		currentUserId: state.auth.userId
	}
}

export default connect(
	mapStateToProps,
	{ fetchStreams }
)(StreamList)
