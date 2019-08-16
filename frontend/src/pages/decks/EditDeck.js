import React from 'react';

class DeckPage extends React.Component {
	render() {

		if(this.props.location.params.deck_id){
			return (
				<p>
					{`Edit deck ${this.props.location.params.deck_id}`}
				</p>
			)
		}

		return (
			<p>
				Create Deck
			</p>
		)
	}
}

export default DeckPage;