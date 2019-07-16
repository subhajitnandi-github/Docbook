import React from 'react'

function Spinner() {
	return (
		<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
			<div className="spinner-grow" role="status" style={{ width: '4rem', height: '4rem' }}>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	)
}

export default Spinner
