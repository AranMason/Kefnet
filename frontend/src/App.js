import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Helmet } from 'react-helmet';

import Container from './template/Container'

function App() {
  return (
    <div>
      <Helmet title="Login App">
        Login
      </Helmet>
      <Container>

      </Container>
    </div>
  );
}

export default App;
