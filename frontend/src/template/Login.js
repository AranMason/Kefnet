import React from 'react';

import { connect } from 'react-redux';

import { loginUser, logOutUser } from '../redux/actions/login'

class Login extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            isLoggedIn: false
        }

        this.login = this.login.bind(this);
    }

    login(){
        this.props.login("Aran", "12345");
    }

    renderLoginButton(){
                if(this.props.isLoggedIn){
            return (
                <button onClick={this.props.logout}>
                    Logout {this.props.user.username}
                </button>
            )
        } else {
            return (
                <button onClick={this.login}>
                    Login
                </button>
            )
        }

    }

    render(){
        return (
            <div>
                Login {this.renderLoginButton()} 
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)