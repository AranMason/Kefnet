import React from 'react';
// import logo from './logo.svg';
import './App.css';

import { Helmet } from 'react-helmet';

// import Container from './template/Container'

import { connect } from 'react-redux';


import HeaderLogin from './components/HeaderLogin';

import AppRouter from './AppRouter'
import { BrowserRouter as Router} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getLoginStatus } from './redux/actions/login';
// import Loading from './components/Loading';


class App extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.loginStatus();
    setInterval(() => {
      console.log("Checking login")
      this.props.loginStatus();
    }, 300000) // Every 5 Minutes
  }

  render() {

    return (
      <div className="App">
        <Helmet title="Kefnet - Magic Stat Tracker">
            
        </Helmet>
        <Router>
          

          <header className="App-header">
            <Link to="/" className="App-header-title">
              Kefnet
            </Link>
            <div className="App-header-menu">
              <HeaderLogin />
            </div>
          </header>

          <section className="App-content">
            <AppRouter/>
          </section>

          
        
        <section className="App-footer">
            Built by AngelOfMercy - Aran Mason
          </section>
        </Router>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
