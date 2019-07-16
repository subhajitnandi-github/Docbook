import React from 'react'

function SignInPrompt() {
	return (
		<div className="row vh-100 justify-content-center mx-0 align-items-center text-center">
			<div className="col-10 col-md-6">
				<div className="card border-danger">
					<div className="card-header text-danger">
						<h5>SignIn</h5>
					</div>
					<div className="card-body text-danger">
						<p className="card-text">
							Please sign in to view your doclings and to create new ones.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignInPrompt
