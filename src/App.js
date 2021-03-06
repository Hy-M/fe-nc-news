import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Title from './components/Title';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ArticlesList from './components/ArticlesList';
import SingleArticle from './components/SingleArticle';
import Err from './components/Err';
import Login from './components/Login';

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
         <Login path='/login' />
         <ArticlesList path='/'/>
         <ArticlesList path='/:topic'/>
         <SingleArticle path='/articles/:article_id' user={this.state.user}/>
         <Err default />
       </Router>
       <Footer />
      </div>
    );
  }
}

export default App;
