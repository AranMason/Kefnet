import React from 'react';

import { Link } from 'react-router-dom'

// import { connect } from 'react-redux';

// const blankUser = {
// 	userId: null,
// 	didWin: false,
// 	deckId: null
// }

class ViewMatch extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			numPlayers: 2,
			participants: [null, null]
		}

		this.addPlayer = this.addPlayer.bind(this);
		this.removePlayer = this.removePlayer.bind(this);
	}

	removePlayer(){
		this.setState({
			numPlayers: Math.max(this.state.numPlayers - 1, 2)
		})
	}

	addPlayer(){
		this.setState({
			numPlayers: this.state.numPlayers + 1
		})
	}

	render(){
		return (
			<div>
				<p>
					View MATCH
				</p>
				<Link to={`/deck/${this.props.location.params.deck_id}/edit`}>
					Edit
				</Link>
			</div>
		)
	}
}

export default ViewMatch;