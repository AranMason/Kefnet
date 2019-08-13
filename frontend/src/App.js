import React from 'react';
// import logo from './logo.svg';
import './App.css';

import { Helmet } from 'react-helmet';

// import Container from './template/Container'

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import HeaderLogin from './template/HeaderLogin';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

import { getLoginStatus } from './redux/actions/login';
import Loading from './template/Loading';

class App extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.loginStatus();
  }

  render() {

    return (
      <div className="App">
        <Router>
          <Helmet title="Kefnet - Magic Stat Tracker">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
          </Helmet>

          <header className="App-header">
            <Link to="/" className="App-header-title">
              Kefnet
            </Link>
            <div className="App-header-menu">
              <HeaderLogin />
            </div>
          </header>

          <section className="App-content">
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={LoginPage} />

            <Route path="/signup" component={HomePage} />
            <Route path="/dashboard" component={HomePage} />

            <Route path="/test" component={Loading} />
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
