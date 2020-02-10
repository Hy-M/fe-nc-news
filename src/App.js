import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Title from './components/Title';
import Nav from './components/Nav';
import Footer from './components/Footer';

class App extends Component {
  state = {
    user: 'jessjelly'
  }

  render() {
    return (
      <div className="App">
       <Title user={this.state.user} /> 
       <Nav />
       <Router>
         
       </Router>
       <Footer />
      </div>
    );
  }
}

export default App;
