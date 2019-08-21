import React from 'react';
import './UserDeckList.css';

import axios from 'axios';

import Loading from '../../components/Loading';
import UserDeckCard from './components/UserDeckCard';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class UserDeckList extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            isLoading: true,
            redirect: false,
            decks: this.props.deck || []
        }
    }

    componentDidMount(){
        axios.get('/deck/users').then(data => {
            this.setState({
                decks: data.data || []
            })
        }).catch(err => {
            console.error(err);
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
                    console.log(deck)
                    return (
                        <UserDeckCard key={deck.id} deck={deck} />
                    )
                })}
                
            </div>
        )
    }
}

export default UserDeckList