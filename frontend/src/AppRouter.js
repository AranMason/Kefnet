import React from 'react';

import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Loading from './components/Loading';

import LoginPage from './pages/login/LoginPage';
import SignUpPage from './pages/login/SignUpPage';
import Dashboard from './pages/Dashboard';

import DeckHomePage from './pages/decks/DeckHomePage';
import ViewDeck from './pages/decks/ViewDeck';
import EditDeck from './pages/decks/EditDeck';

import ViewMatch from './pages/match/ViewMatch';
import EditMatch from './pages/match/EditMatch';


class AppRouter extends React.Component{

	//https://reacttraining.com/react-router/web/example/animated-transitions
	//Could explore using CSSTransition for page changes?

	render(){
		return(		
				<Switch>
					<Route path="/" exact component={HomePage} />

					<Route path="/login" component={LoginPage} />
					<Route path="/signup" component={SignUpPage} />
					<Route path="/dashboard" component={Dashboard} />

					<Route path='/deck' exact component={DeckHomePage} />
					<Route path='/deck/add' exact component={EditDeck} />
					<Route path='/deck/:deck_id' component={ViewDeck}/>
					<Route path='/deck/:deck_id/edit' component={EditDeck}/>

					<Route path='/match' exact component={null} />
					<Route path='/match/create' component={EditMatch}/>
					<Route path='/match/:match_id/edit' component={EditMatch} />
					<Route path='/match/:match_id' component={ViewMatch} />

					<Route component={Loading} />
				</Switch>
		)
	}
}

export default AppRouter;