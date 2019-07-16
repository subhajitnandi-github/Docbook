import React from 'react'
import { Link } from 'react-router-dom'

import GoogleAuth from './GoogleAuth'

class Header extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-dark navbar-expand-md bg-dark sticky-top">
				<Link to="/" className="navbar-brand">
					<i className="fas fa-book fa-lg mr-2" />
					DOCBOOK
				</Link>
				<button
					className="navbar-toggler"
					data-toggle="collapse"
					data-target="#navLinks"
					aria-label="Toggle Navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse justify-content-center" id="navLinks">
					<ul className="navbar-nav">
						<li className="nav-item px-md-4">
							<Link to="/my_documents" className="nav-link">
								<i className="fas fa-thumbtack fa-lg mr-2" />
								My Doclings
							</Link>
						</li>
						<li className="nav-item px-md-4">
							<a href="https://github.com/Kristency/Docbook" className="nav-link">
								<i className="fab fa-github-alt fa-lg mr-2" />
								Github
							</a>
						</li>
						<li className="nav-item px-md-4">
							<a href="#" className="nav-link">
								<i className="fas fa-user-tie fa-lg mr-2" />
								PortFolio
							</a>
						</li>
					</ul>
				</div>
				{/* <ul className="navbar-nav">
					<li className="nav-item active">
						<Link to="/my_documents" className="nav-link">
							Create Stream
						</Link>
					</li>
				</ul> */}
				<GoogleAuth />
			</nav>
		)
	}
}

export default Header
