import React from 'react';

import { connect } from 'react-redux';
import login from '../redux/reducers/login';

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
        console.log("test")
        this.props.login("Aran", "12345");
    }

    renderLoginButton(){

        if(this.state.isLoggedIn){
            return (
                <button onClick={this.state.logout}>
                    Logout {this.state.user.username}
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
    return {
        isLoggedIn: state.login.isLoggedIn,
        user: state.login.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)