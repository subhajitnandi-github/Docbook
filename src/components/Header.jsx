import React from 'react'
import { Link } from 'react-router-dom'

import GoogleAuth from './GoogleAuth'

class Header extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-dark bg-dark sticky-top">
				<Link to="/" className="navbar-brand">
					Streamy
				</Link>
				<ul className="navbar-nav">
					<li className="nav-item active">
						<Link to="/streams/new" className="nav-link">
							Create Stream
						</Link>
					</li>
				</ul>
				<GoogleAuth />
			</nav>
		)
	}
}

export default Header
