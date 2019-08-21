import React from 'react';
import './Dashboard.css';

import Loading from '../components/Loading';

import UserDeckList from './decks/UserDeckList'

import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Dashboard extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			isLoading: true
		}
	}

	componentDidMount(){
		this.setState({
			isLoading: false
		})
	}

	render(){

		if(this.props.awaitingLogin || this.state.isLoading){
			return (
				<Loading />
			)
		}

		if(!this.props.isLoggedIn){
			return (
				<Redirect to="/" />
			)
		}

		console.log("Props: ", this.props);

		return (
			<div className="Dashboard">
				<section className="Dashboard-user">
					<div>
						<p>
							{this.props.user.username}
						</p>
						<p>
							Email: {this.props.user.email}
						</p>
					</div>
					
				</section>
				<section>
					<div className="Dashboard-list Dashboard-decks">
						Deck List(s)
						<UserDeckList {...this.props.user} />
						<Link to="/deck/add">
							<Button>
								Add new deck
							</Button>
						</Link>
					</div>
					<div className="Dashboard-list Dashboard-matches">
						Match History - Coming Soon
					</div>
				</section>
				

			</div>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return {
		isLoggedIn: state.login.isLoggedIn,
		awaitingLogin: state.login.awaitingLogin,
		user: state.login.user
	}
}

export default connect(mapStateToProps)(Dashboard);