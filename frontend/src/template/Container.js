import React from 'react';

import Header from './Header';
import Loading from './Loading';

import { connect } from 'react-redux';
import { getLoginStatus } from '../redux/actions/login'

class Container extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            username: "Unknown",
            success: false
        }
    }

    componentDidMount(){
 
        this.props.loginStatus();
    }

    render(){

        if(this.props.isLoading){
            return (
                <Loading/>
            )
        }

        return (
            <div className="Container">
                <Header/>
                {this.state.user && this.state.user.username}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loginStatus: () => {
            dispatch(getLoginStatus())
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoading: state.login.awaitingLogin
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);