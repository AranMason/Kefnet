import React from 'react';
import './EditDeck.css'

import Loading from '../../components/Loading';

import axios from 'axios';

import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class EditDeck extends React.Component {

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
		this.handleSubmit = this.handleSubmit.bind(this);

		this.renderAlert = this.renderAlert.bind(this);
		// this.renderTitle = this.renderTitle.bind(this);
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
					// TODO Extract provider deck id
				}
			})
		}
	}

	handleSubmit(e){
		e.preventDefault();
		this.setState({
			isLoading: true
		})
		// TODO
		axios.post('/deck/add', {
			name: this.state.name,
			url: this.state.external.url,
			colour_identity: "wubrg".toUpperCase(),
			format: 'Standard'
		}).then(res => {
			console.log(res);
			this.setState({
				redirect: '/dashboard'
			})
		}).catch(err => {
			console.log(err.response);
			this.setState({
				isLoading: false,
				alert: {
					type: 'warning',
					message: err.response.data
				}
			})
		})
	}

	renderAlert(){

		if(this.state.alert){
			return (
				<Alert variant={this.state.alert.type}>
					{this.state.alert.message}
				</Alert>
			)
		} else {
			return null;
		}

	}

	render() {

		if(this.state.isLoading){
			return (<Loading />)
		}

		if(this.state.redirect){
			return (
				<Redirect to={this.state.redirect}/>
			)
		}

		return (
			<div className="EditDeck">
				<h2>
					Add new Deck
				</h2>
				<Form onSubmit={this.handleSubmit}>
					{this.renderAlert()}
					<Form.Group>
						<Form.Label>Deck name</Form.Label>
    					<Form.Control name="name" onChange={this.handleChange} value={this.state.name} type="text" placeholder="Deck name..." />
					</Form.Group>

					<Form.Group>
						<Form.Label>Deck URL</Form.Label>
    					<Form.Control name="url" onChange={this.handleChange} value={this.state.external.url} type="text" placeholder="Deck url..." />
						<Form.Text className="text-muted">
    					  Provide a link to your decklist, currently supporting: 
						  <ul>
							  <li>MTG Goldfish</li>
							  <li>Tappedout</li>
							  <li>Archidekt</li>
						  </ul>
    					</Form.Text>
					</Form.Group>

					<Form.Group>
						<Form.Label>
							Deck Colour
						</Form.Label>
						<div>
						{['White', 'Blue', 'Black', 'Red', 'Green'].map(colour => {
						return (
							<Form.Check inline label={colour} type="checkbox" id={`inline-${colour}`} key={colour}/>
						)
					})}

						</div>
					</Form.Group>

					<Button variant="primary" type="submit">
    Submit
  </Button>
					
				</Form>
					
			</div>
		)
	}
}

export default EditDeck;