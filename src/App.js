import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Title from './components/Title';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ArticlesList from './components/ArticlesList';
import SingleArticle from './components/SingleArticle';

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
         <ArticlesList path='/'/>
         <ArticlesList path='/:topic'/>
         <SingleArticle path='/articles/:article_id' />
       </Router>
       <Footer />
      </div>
    );
  }
}

export default App;
