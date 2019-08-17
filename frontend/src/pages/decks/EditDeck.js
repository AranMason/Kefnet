import React from 'react';

import Loading from '../../template/Loading';

import { Form } from 'react-bootstrap';

class DeckPage extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			isLoading: true,
			deck_id: props.location.params.deck_id,
			name: '',
			external: {
				url: '',
				provider: null,
				id: null
			},
			// provider: 'None'
		}

		this.handleChange = this.handleChange.bind(this);
		this.renderTitle = this.renderTitle.bind(this);
	}

	componentWillMount(){
		if(this.state.deck_id){
			//Load deck

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
					//TODO Extract provider?
					//TODO Extract provider deck id
				}
			})
		}

		this.setState
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

		if(this.state.isLoading){
			return (<Loading />)
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
			</div>
		)
	}
}

export default DeckPage;