import React from 'react';
import { Link } from 'react-router-dom';

import GoogleAuth from './GoogleAuth';

class Header extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-dark bg-dark">
				<Link to="/" className="navbar-brand">
					Streamy
				</Link>
				<ul className="navbar-nav">
					<li className="nav-item active">
						<Link to="/" className="nav-link">
							All Streams
						</Link>
					</li>
				</ul>
				<GoogleAuth />
			</nav>
		);
	}
}

export default Header;
