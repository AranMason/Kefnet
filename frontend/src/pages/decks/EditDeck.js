import React from 'react';

import Loading from '../../components/Loading';

import axios from 'axios';

import { Form } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';

class DeckPage extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			isLoading: true,
			redirect: false,
			deck_id: props.location.params && props.location.params.deck_id,
			name: '',
			external: {
				url: '',
				provider: null,
				id: null
			},
			owner: {
				name: 'Unknown',
				id: null
			}
			// provider: 'None'
		}

		this.handleChange = this.handleChange.bind(this);
		this.renderTitle = this.renderTitle.bind(this);
	}

	componentDidMount(){
		if(this.state.deck_id){
			//Load deck
			axios.get(`/deck/${this.state.deck_id}`).then(res => {
				this.setState({
					deck_id: res.body.id,
					external: {
						url: res.body.url,
						provider: res.body.provider,
						id: res.body.provider_id
					},
					isLoading: false
				})
			}).catch(err => {
				console.log(err);
				this.setState({
					redirect: '/'
				})
			})

			this.setState({
				isLoading: false
			})
		}
		else {
			this.setState({
				isLoading: false
			})
		}
	}

	handleChange(e){

		if(e.target.name === "name"){
			this.setState({
				name: e.target.value
			})
		}
		else if(e.target.name === "url"){
			this.setState({
				external: {
					url: e.target.value
					// TODO Extract provider?
					//TODO Extract provider deck id
				}
			})
		}
	}

	renderTitle(){
		if(this.state.deck_id){
			return (
				<h2>
					Editing {this.state.name}
				</h2>
			)
		}
		else {
			return (
				<h2>
					New Deck
				</h2>
			)
		}
	}

	render() {

		console.log('Deck Id: ', this.state.deck_id)

		if(this.state.isLoading){
			return (<Loading />)
		}

		if(this.state.redirect){
			return (
				<Redirect to={this.state.redirect}/>
			)
		}

		return (
			<div>
				{this.renderTitle()}
				<Form>
					<input name="name" type="text" onChange={this.handleChange} value={this.state.name} placeholder="Deck name"></input>

					<input name="url" type="text" onChange={this.handleChange} value={this.state.external.url} placeholder="Deck link" />
				</Form>
				<div className="Deck-provider">
					{this.state.external.provider}
				</div>
				<div>
					<Link to={`/users/${this.state.owner.id}`}>
						{this.state.owner.name}'s deck'
					</Link>
						
				</div>	
			</div>
		)
	}
}

export default DeckPage;