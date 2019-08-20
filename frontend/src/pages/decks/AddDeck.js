import React from 'react';
import './EditDeck.css'

import Loading from '../../components/Loading';

import axios from 'axios';

import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class AddDeck extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			isLoading: true,
			redirect: false,
			name: '',
			url: '',
			colour: {
				White: false,
				Blue: false,
				Red: false,
				Black: false,
				Green: false
			}
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.renderAlert = this.renderAlert.bind(this);
		// this.renderTitle = this.renderTitle.bind(this);
	}

	componentDidMount(){
		this.setState({
			isLoading: false
		})
	}

	handleChange(e){
		if(e.target.name === "name"){
			this.setState({
				name: e.target.value
			})
		}
		else if(e.target.name === "url"){
			this.setState({
				url: e.target.value
			})
		}
		else if(e.target){
			this.setState({
				colour: {
					...this.state.colour,
					[e.target.name]: e.target.checked
				}
			})
		}
	}

	handleSubmit(e){
		e.preventDefault();
		this.setState({
			isLoading: true
		})

		const translateColour = {
			White: 'W',
			Blue: 'U',
			Black: 'B',
			Red: 'R',
			Green: 'G'
		}

		const colour_identity = Object.keys(this.state.colour).map(colour => {
			return this.state.colour[colour] ? translateColour[colour] : ''
		}).join('');

		const request_body = {
			name: this.state.name,
			url: this.state.url,
			colour_identity,
			format: 'Standard'
		};

		// TODO
		axios.post('/deck/add', request_body).then(res => {
			this.setState({
				isLoading: false,
				redirect: '/dashboard'
			})
		}).catch(err => {
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
    					<Form.Control name="url" onChange={this.handleChange} value={this.state.url} type="text" placeholder="Deck url..." />
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
							<Form.Check name={colour} onChange={this.handleChange} checked={this.state.colour[colour]}inline label={colour} type="checkbox" id={`inline-${colour}`} key={colour}/>
						)
					})}

						</div>
					</Form.Group>

					<Form.Group controlId="exampleForm.ControlSelect1">
						<Form.Label>Select Format</Form.Label>
						<Form.Control as="select">
							{['Commander/EDH', 'Brawl', 'Oathbreaker', 'Standard', 'Modern', 'Legacy', 'Other'].map(items => {
								return (
									<option key={items}>{items}</option>
								)
							})}
						</Form.Control>
					</Form.Group>

					<Button variant="primary" type="submit">
    Submit
  </Button>
					
				</Form>
					
			</div>
		)
	}
}

export default AddDeck;