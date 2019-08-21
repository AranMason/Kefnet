import React from 'react';
import './UserDeckCard.css';

import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ManaIcon from '../../../components/ManaIcon';

import ColourIdentity from './ColourIdentity';

class UserDeckCard extends React.Component {

    render() {

        console.log(this.props.deck)

        return (
            <div className="UserDecksCard">
                <div className="UserDeckCard-data">
                    <div className="UserDeckCard-title">
                        {this.props.deck.name}
                    </div>
                    <div className="UserDeckCard-button">
                        <Link to={`/deck/${this.props.deck.id}/edit`}>
                            <Button>
                                Edit
                            </Button>
                        </Link>
                    </div>
                    <div className="UserDeckCard-button">
                        <Link to={`/deck/${this.props.deck.id}`}>
                            <Button>
                                View
                            </Button>
                        </Link>
                    </div>
                </div>
                <div style={{
                    width: "100%"
                }}>
                    <ColourIdentity hide value={this.props.deck} />
                    {/* <div className="UserDeckCard-bar-container">
                        {"wub".split('').map(colour => {
                            return (
                                <div key={colour} className={`UserDeckCard-bar UserDeckCard-bar-${colour.toLowerCase()}`}>
                                    <ManaIcon icon={colour} size="2em"/>
                                </div>
                            )
                        })}
                    </div> */}
                </div>
            </div>
        )
    }
}

export default UserDeckCard;