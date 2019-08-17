import React from 'react';

import {} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
	render(){

		if(!this.props.isLoggedIn){
			return (
				<Redirect to="/" />
			)
		}

		return (
			<div>
				<Link to="/deck/add">
					Add Deck
				</Link>
				<Link to="/matchs/create">
					Register New Match
				</Link>
				TO DO List:
				<ul>
					<li>List Decks that you have</li>
					<li>List Matches that you have been in recently</li>
					<li>Give you some stats about your games</li>
				</ul>
			</div>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return {
		isLoggedIn: state.login.isLoggedIn,
		user: state.login.user
	}
}

export default connect(mapStateToProps)(Dashboard);