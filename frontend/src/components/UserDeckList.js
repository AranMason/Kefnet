import React from 'react';
import './UserDeckList.css';

import axios from 'axios';

import Loading from './Loading';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class UserDeckList extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            isLoading: true,
            redirect: false,
            decks: []
        }
    }

    componentDidMount(){
        axios.get('/deck/users').then(data => {
            console.log(data);
            this.setState({
                decks: data.data || []
            })
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            this.setState({
                isLoading: false
            })
        })
    }

    render(){

        if(this.state.isLoading){
            return (
                <Loading />
            )
        }

        return (
            <div>
                {this.state.decks.map(deck => {
                    return (
                        <div key={deck.id} className="UserDeckList-entry">
                            <div className="UserDeckList-name">
                                {deck.name}    
                            </div>
                            <div className="UserDeckList-button">
                                <Link to={`/deck/${deck.id}/edit`}>
                                    <Button>
                                        Edit
                                    </Button>
                                </Link>
                            </div>
                            <div className="UserDeckList-button">
                                <Link to={`/deck/${deck.id}`}>
                                    <Button>
                                        View
                                    </Button>
                                </Link>
                            </div>
                            

                        </div>
                    )
                })}
                
            </div>
        )
    }
}

export default UserDeckList