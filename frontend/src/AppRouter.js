import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';

import LoginPage from './pages/login/LoginPage';
import SignUpPage from './pages/login/SignUpPage';
import Dashboard from './pages/Dashboard';

import DeckHomePage from './pages/decks/DeckHomePage';
import EditDeck from './pages/decks/EditDeck';

import ViewMatch from './pages/match/ViewMatch';
import EditMatch from './pages/match/EditMatch';


class AppRouter extends React.Component{

	render(){
		return(
			<Router>
				<Switch>
					<Route path="/" exact component={HomePage} />

					<Route path="/login" component={LoginPage} />
					<Route path="/signup" component={SignUpPage} />
					<Route path="/dashboard" component={Dashboard} />

					<Route path='/deck' exact component={DeckHomePage} />
					<Route path='/deck/add' exact component={EditDeck} />
					<Route path='/deck/:deck_id' component={null}/>
					<Route path='/deck/:deck_id/edit' component={EditDeck}/>

					<Route path='/match' exact component={null} />
					<Route path='/match/create' component={EditMatch}/>
					<Route path='/match/:match_id/edit' component={EditMatch} />
					<Route path='/match/:match_id' component={ViewMatch} />

					<Route component={Loading} />
				</Switch>
			</Router>
		)
	}
}

export default AppRouter;