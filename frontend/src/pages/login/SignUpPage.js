import React from 'react';
import './LoginPage.css';

import { connect } from 'react-redux';
import { signUpUser } from '../../redux/actions/login'

import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Loading from '../../template/Loading';

class LoginPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            rejected: false,
            submitted: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e){
        e.preventDefault();



        if(!this.validateUsername(this.state.username)){
            this.setState({
                rejected: "Invalid Username"
            })
        }
        else if(!this.validateEmail(this.state.email)){
            this.setState({
                rejected: "Invalid Email Adress"
            })
        }
        else if(!this.validatePassword(this.state.password)){
            this.setState({
                rejected: "Invalid Password"
            })
        }
        else {
            this.setState({
                submitted: true
            })

            this.props.signup(this.state.username, this.state.email, this.state.password);

            this.setState({
                attemptedLogin: true
            })
        }


    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    validateUsername(username){
        return username.length >= 6;
    }

    validateEmail(email){
        return /^(([^<>()[\]\\.,;:\s@"]+(.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    }

    validatePassword(password){
        return password.length >= 8;
    }

    renderAlert(rejected){
        if(!rejected){
            return null;
        }
        else {
            return (
                <Alert variant="warning">
                    {rejected}
                </Alert>
            )
        }
    }

    render(){

        if(this.props.isLoggedIn){
            return (
                <Redirect to='/dashboard' />
            )
        }

        if(this.props.submitted){
            return (
                <Loading />
            )
        }

        return (
            <div className="LoginPage" onSubmit={this.handleSubmit}>

                <Form className="LoginPage-form">
                    {this.renderAlert(this.state.rejected)}
                    {/*
                        User Name
                    */}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter username" value={this.state.username} isValid={this.validateUsername(this.state.username)} isInvalid={!this.validateUsername(this.state.username) && this.state.username > 1} name="username" onChange={this.handleChange}/>
                    </Form.Group>
                    {/*
                        Email
                    */}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={this.state.email} isValid={this.validateEmail(this.state.email)} name="email" onChange={this.handleChange}/>

                    </Form.Group>
                    {/*
                        Password
                    */}
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        signup: (username, email, password) => {
            dispatch(signUpUser(username, email, password))
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);