import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'

import StreamCreate from './streams/StreamCreate'
import StreamEdit from './streams/StreamEdit'
import StreamList from './streams/StreamList'
import StreamShow from './streams/StreamShow'
import StreamDelete from './streams/StreamDelete'
import Header from './Header'
import history from '../history'

class App extends Component {
	render() {
		return (
			<div className="container-fluid px-0">
				<Router history={history}>
					<Header />
					<div>
						<Route path="/" exact component={StreamList} />
						<Route path="/streams/new" exact component={StreamCreate} />
						<Route path="/streams/edit/:id" exact component={StreamEdit} />
						<Route path="/streams/delete/:id" exact component={StreamDelete} />
						<Route path="/streams/show/:id" exact component={StreamShow} />
					</div>
				</Router>
			</div>
		)
	}
}

export default App
