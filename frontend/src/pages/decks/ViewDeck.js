import React from 'react';

class DeckPage extends React.Component {
	render() {
		return (
			<p>
				{`View deck: ${this.props.location.params.deck_id}`}
			</p>
		)
	}
}

export default DeckPage;