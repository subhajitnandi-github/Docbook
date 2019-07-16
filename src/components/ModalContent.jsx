import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class ModalContent extends React.Component {
	render() {
		return (
			<Modal
				show={this.props.show}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Body>
					<h2 className="text-center text-dark">{this.props.title}</h2>
					<h6 className="text-center">{this.props.message}</h6>
					<small className="text-center text-danger">{this.props.warning}</small>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={this.props.onConfirm}>
						Delete
					</Button>
					<Button variant="dark" onClick={this.props.onHide}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

export default ModalContent
