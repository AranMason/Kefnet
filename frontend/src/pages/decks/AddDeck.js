import React from 'react';
import './AddDeck.css'

import Loading from '../../components/Loading';

import axios from 'axios';

import { connect } from 'react-redux';
import { getLoginStatus } from '../../redux/actions/login';

import { Form, Button, Alert, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import FormatDropdown from './components/FormatDropdown';
import ColourIdentity from './components/ColourIdentity';

class AddDeck extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			isLoading: true,
			redirect: false,
			name: '',
			url: '',
			colour: {
				white: false,
				blue: false,
				black: false,
				red: false,
				green: false
			},
			format: 'Standard',
			formatList: []
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.renderAlert = this.renderAlert.bind(this);
		// this.renderTitle = this.renderTitle.bind(this);
	}

	componentDidMount() {
		this.setState({
			isLoading: false
		})
	}

	handleChange(e) {
		if (e.target === "ColourIdentity") {
			this.setState({
				colour: {
					...this.state.colour,
					[e.value]: !this.state.colour[e.value]
				}
			})
		}
		else if (e.target.name === "name") {
			this.setState({
				name: e.target.value
			})
		}
		else if (e.target.name === "url") {
			this.setState({
				url: e.target.value
			})
		}
		else if (e.target.name === "format") {
			this.setState({
				format: e.target.value
			})
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({
			isLoading: true
		})

		const request_body = {
			name: this.state.name,
			url: this.state.url,
			colour_identity: this.state.colour,
			format: this.state.format
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

	renderAlert() {

		if (this.state.alert) {
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

		if (this.state.isLoading) {
			return (<Loading />)
		}

		if (this.state.redirect) {
			return (
				<Redirect to={this.state.redirect} />
			)
		}

		if (!this.props.isLoggedIn) {
			return (
				<Redirect to={'/login?redirect=/deck/add'} />
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

					<Form.Row>
						<Form.Group as={Col} md="4">
							<ColourIdentity title=""
								onChange={this.handleChange}
								value={this.state.colour} />
						</Form.Group>
						<Form.Group as={Col} md="8">
							<FormatDropdown
								name="format"
								onChange={this.handleChange}
								value={this.state.format} />
						</Form.Group>
					</Form.Row>

					<Button variant="primary" type="submit">
						Submit
  					</Button>

				</Form>

			</div>
		)
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		loginStatus: () => {
			dispatch(getLoginStatus())
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		isLoggedIn: state.login.isLoggedIn
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);