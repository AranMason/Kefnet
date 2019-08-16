import React from 'react';

class DeckPage extends React.Component {
	render() {
		return (
			<div>
				<p>
					{`View deck: ${this.props.location.params.deck_id}`}
				</p>
				<Link to={`/deck/${this.props.location.params.deck_id}/edit`}>
					Edit
				</Link>
			</div>

		)
	}
}

export default DeckPage;