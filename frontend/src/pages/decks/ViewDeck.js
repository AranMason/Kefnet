import React from 'react';

import Loading from '../../components/Loading';

import DeckList from './components/DeckList';

import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

class DeckPage extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			isLoading: true,
			redirect: false,
			deck_id: this.props.location.props && this.props.location.params.deck_id,
			deck: null
		}
	}

	componentWillMount(){
		axios.get(`/deck/${this.state.deck_id}`).then(res => {
			this.setState({
				isLoading: false,
				deck: res.body
			})
		}).catch(err => {
			console.err(err);
			this.setState({
				redirect: '/deck'
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
			<div>
				<p>
					{`View deck: ${this.props.location.params.deck_id}`}
				</p>
				<DeckList id={this.state.deck_id}/>
				<Link to={`/deck/${this.props.location.params.deck_id}/edit`}>
					Edit
				</Link>
			</div>

		)
	}
}

export default DeckPage;