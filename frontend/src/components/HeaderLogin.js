import React from 'react';
import './HeaderLogin.css'

import { Link } from 'react-router-dom';
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
    }

    renderLoginButton(){

        if(this.props.isLoggedIn){

            // const intros = ['Welcome', 'Hi', 'Kia ora']

            return (
                <div className="Login-loggedin">
                    {}
                    <div className="Login-welcome">
                        <Link to="/dashboard">
                            Welcome {this.props.user.username}
                        </Link>
                    </div>
                    
                    <button className="Login-button" onClick={this.props.logout}>
                        Logout
                    </button>
                </div>
            )
        } else {
            return (
                <div className="Login-loggedout-container">
                    <Link to="/login">
                        <button className="Login-button Login-loggedout">
                            Login
                        </button>
                    </Link>
                    
                    <Link to="/signup">
                        <button className="Login-button Login-loggedout">
                            Signup
                        </button>
                    </Link>
                    
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
            dispatch(loginUser(username, password))
        },
        logout: () => {
            dispatch(logOutUser())
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.login.isLoggedIn,
        awaitingLogin: state.login.awaitingLogin,
        user: state.login.user || {}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogin);