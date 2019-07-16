import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import DocumentCreate from './documents/DocumentCreate'
import DocumentEdit from './documents/DocumentEdit'
import DocumentList from './documents/DocumentList'
import UserDocumentList from '../components/documents/UserDocumentList'
import DocumentShow from './documents/DocumentShow'
import Error from './Error'
import Header from './Header'
import history from '../history'
import Footer from './Footer'

class App extends Component {
	render() {
		return (
			<div className="container-fluid px-0">
				<Router history={history}>
					<Header />
					<div>
						<Switch>
							<Route path="/" exact component={DocumentList} />
							<Route path="/my_documents" exact component={UserDocumentList} />
							<Route path="/documents/new" exact component={DocumentCreate} />
							<Route path="/documents/edit/:id" exact component={DocumentEdit} />
							<Route path="/documents/:id" exact component={DocumentShow} />
							<Route path="/error" exact component={Error} />
						</Switch>
					</div>
					<Footer />
				</Router>
			</div>
		)
	}
}

export default App
