import React from 'react';

import { Link } from 'react-router-dom'

class ViewMatch extends React.Component {
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