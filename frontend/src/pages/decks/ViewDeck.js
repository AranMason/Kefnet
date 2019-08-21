import React from 'react';
import './ViewDeck.css';

import Loading from '../../components/Loading';

import DeckList from './components/DeckList';

import axios from 'axios';
import { Button, Row, Col } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';

class DeckPage extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			isLoading: true,
			redirect: false,
			deck_id: this.props.match.params && this.props.match.params.deck_id,
			deck: null
		}
	}

	componentDidMount(){
		console.log(this.state)
		axios.get(`/deck/${this.state.deck_id}`).then(data => {
			console.log("Response: ", data.data);
			this.setState({
				isLoading: false,
				deck: data.data
			})
		}).catch(err => {
			console.error(err);
			this.setState({
				redirect: '/deck/add'
			})
		})
	}

	render() {

		if(this.state.isLoading || !this.state.deck){
			return (
				<Loading />
			)
		}

		if(this.state.redirect){
			return (
				<Redirect to={this.state.redirect} />
			)
		}
		
		return (
			<div className="ViewDeck">
				<Row>
					<Col md="8">
						<h1>
							{this.state.deck.name}
						</h1>
					</Col>
					<Col>
						ID: {this.state.deck.colour_identity}
					</Col>
				</Row>
				
				<div>
					By <Link to={`/user/${this.state.deck.user.id}`}>
						{this.state.deck.user.username}
					</Link>
					<Link to={`deck/${this.state.deck_id}/edit`}>
						<Button>
							Edit
						</Button>
					</Link>
				</div>
				
				
				<DeckList id={this.state.deck_id}/>
				<Link to={`/deck/${this.state.deck_id}/edit`}>
					Edit
				</Link>

				
					<ul>
						<li>
							Recent Matches
						</li>
						<li>
							Pull data from provider
						</li>
						<li>
							Make it so only owner can edit
						</li>
					</ul>
				
			</div>
		)
	}
}

export default DeckPage;