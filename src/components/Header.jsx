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
					<div className="mr-sm-2">
						<li className="nav-item active mr-sm-5">
							<Link to="/" className="nav-link">
								All Streams
							</Link>
						</li>
						<GoogleAuth />
					</div>
				</ul>
			</nav>
		);
	}
}

export default Header;
