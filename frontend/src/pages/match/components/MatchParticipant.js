import React from 'react';

import { connect } from 'react-redux';

class MatchParticipant extends React.Component{

    constructor(props){
        super(props)

        //Props:
        // user
        // turn_order

        this.state = {

        }

        this.claimMatch = this.claimMatch.bind(this);
        this.renderClaimButton = this.renderClaimButton.bind(this);
    }

    claimMatch(){

    }

    renderClaimButton(){
        //Check if the user is logged in
        if(!this.props.isLoggedIn){
            return (
                <Link to={`/login?redirect=/match/${this.props.match_id}`} >
                    Claim
                </Link>
            )
        }
        //Check if they have already claimed? Or can someone claim multiple spaces?
        else {
            return (
                <button onClick={this.claimMatch}>
                    Claim
                </button>
            )
        }
    }

    render(){

        return (
            <div>

                Position: {this.props.turn_order}
                <p>
                    Deck Select TODO
                </p>
                {this.renderClaimButton}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        isLoggedIn: state.login.isLoggedIn,
        loggedInUserId: state.login.user && state.login.user.id
    }
}

export default connect(mapStateToProps)(MatchParticipant);