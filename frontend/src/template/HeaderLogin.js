import React from 'react';
import './HeaderLogin.css'

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loginUser, logOutUser } from '../redux/actions/login'

import Loading from './Loading';

class HeaderLogin extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            isLoggedIn: false,
            redirect: false
        }

        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
    }

    login(){
        // this.props.login("Aran", "12345");
        this.setState({
            redirect: '/login'
        })
    }

    signup(){
        this.setState({
            redirect: '/signup'
        })
    }

    renderLoginButton(){

        if(this.props.awaitingLogin){
            return (
                <Loading />
            )
        }

        if(this.state.redirect){
            
            return (
                <Redirect to={this.state.redirect}/>
            )
        }


        if(this.props.isLoggedIn){

            const intros = ['Welcome', 'Hi', 'Kia ora']

            return (
                <div className="Login-loggedin">
                    {}
                    <div className="Login-welcome">
                        {_.sample(intros)} {this.props.user.username}
                    </div>
                    
                    <button className="Login-button" onClick={this.props.logout}>
                        Logout
                    </button>
                </div>
            )
        } else {
            return (
                <div className="Login-loggedout-container">
                    <button className="Login-button Login-loggedout" onClick={this.login}>
                        Login
                    </button>
                    <button className="Login-button Login-loggedout" onClick={this.signup}>
                        Signup
                    </button>
                </div>
                
            )
        }

    }

    render(){
        return (
            <div className="Login-container">
                {this.renderLoginButton()} 
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (username, password) => {
            console.log(username, password)
            dispatch(loginUser(username, password))
        },
        logout: () => {
            dispatch(logOutUser())
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    return {
        isLoggedIn: state.login.isLoggedIn,
        awaitingLogin: state.login.awaitingLogin,
        user: state.login.user || {}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogin);