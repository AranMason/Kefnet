import React from 'react';
import './LoginPage.css';

import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/login'

import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Loading from '../template/Loading';

class LoginPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: "",
            attemptedLogin: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e){
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
        this.setState({
            attemptedLogin: true
        })
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    invalidLogin(){

        console.log(this.state.attemptedLogin)

        if(this.state.attemptedLogin && !this.props.awaitingLogin){
            return (
                <Alert style={{
                    fontSize: "0.7em"
                }}variant="warning">
                    Could not sign in, please check your details and try again.
                </Alert>
            )
        }

        return null;
    }

    render(){

        console.log(this.props.location.search);

        if(this.props.isLoggedIn){
            const params = new URLSearchParams(this.props.location.search);

            return (
                <Redirect to={params.get('redirect') || '/'} />
            )
        }

        if(this.props.isLoggedIn){
            return (
                <Loading />
            )
        }

        return (
            <div className="LoginPage" onSubmit={this.handleSubmit}>
                
                <Form className="LoginPage-form">
                    {this.invalidLogin()}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter username" value={this.state.username} name="username" onChange={this.handleChange}/>
                        {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange}/>
                    </Form.Group>
                    {/* <Form.Group controlId="formBasicChecbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
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
        login: (username, password) => {
            console.log(username, password)
            dispatch(loginUser(username, password))
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