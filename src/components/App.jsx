import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'

import DocumentCreate from './documents/DocumentCreate'
import DocumentEdit from './documents/DocumentEdit'
import DocumentList from './documents/DocumentList'
import DocumentShow from './documents/DocumentShow'
import DocumentDelete from './documents/DocumentDelete'
import Header from './Header'
import history from '../history'

class App extends Component {
	render() {
		return (
			<div className="container-fluid px-0">
				<Router history={history}>
					<Header />
					<div>
						<Route path="/" exact component={DocumentList} />
						<Route path="/documents/new" exact component={DocumentCreate} />
						<Route path="/documents/edit/:id" exact component={DocumentEdit} />
						<Route path="/documents/delete/:id" exact component={DocumentDelete} />
						<Route path="/documents/show/:id" exact component={DocumentShow} />
					</div>
				</Router>
			</div>
		)
	}
}

export default App
